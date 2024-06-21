import { useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator"
import { postServices } from "../../Service/API/postService"
import { Post } from "../../Service/Entities/postEntities"
import { userRepository } from "../../Data Access/Repository/userRepository"
import { User } from "../../Service/Entities/userEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter"
import FeedPersistence from "../../Service/Persistence/FeedPersistence"

const feedStateController = () => {

    const [userData, setUserData] = useState<User[]>([])
    const [postData, setPostData] = useState<Post[]>([])
    const postService: postServices = new postServices()
    const uRepository: userRepository = new userRepository()

    const handleFeedFetch = async (): Promise<IReturnAdapter> => {    
        try {
            const req = await postService.getPosts()
            console.log(`Request: ${req}`);
            if (req.valido === false) {
                throw new Error("Bad Request");
            }

            const postData = req.data as Post[]

            let posts: Post[] = []
            postData.forEach(post => {
                const newPost = new Post(
                    post.UserID, 
                    post.description, 
                    post.postId, 
                    post.local, 
                    post.status,
                    post.createdAt
                )
                posts.push(newPost)
            });
            let users: User[] = []
            if (posts[0] instanceof Post) {
                posts.forEach(async(post: Post) => {
                    const reqUser = await uRepository.getUserByUID(post.UserID)
                    if(reqUser.val === false){
                        throw new Error(reqUser.erro as string)
                    }
                    const userData = reqUser.data as User
                    const newUser = new User({
                        displayName: reqUser.data.displayName,
                        course: userData.course,
                        shift: userData.shift
                    })
                    users.push(newUser)
                })
                setUserData(users)
                setPostData(posts)
                return { val: true, data: {post: posts, users: users} };
            }

            throw new Error('Nenhum post encontrado.')
        } catch (error) {
            console.log("handleFeedFetch respondeu com ERRO!")

            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                  return { val: false, erro: error };
                } else if (error.message === "Bad Request") {
                  return { val: false, erro: error };
                }
            }
              return { val: false, erro: "Internal Server Error" };
        }
    }

    const handleFeedInfo = async(): Promise<IReturnAdapter> => {
    try{
        const Feed = FeedPersistence.getInstance()
        const reqFeed = await Feed.getPosts(postData)
        if(reqFeed ===  null){
            throw new Error('Requisição do feed deu errado')
        }    
        return {val: true, data: reqFeed}
    } catch (error) {
            console.log(error)
            return{val: false, erro: `Erro ${error}`}
        }
        
    }

    return {
        handleFeedInfo,
        handleFeedFetch};
};

export { feedStateController }