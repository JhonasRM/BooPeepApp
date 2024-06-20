import { useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator"
import { postServices } from "../../Service/API/postService"
import { Post } from "../../Service/Entities/postEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { User } from "../../Service/Entities/userEntities";
import { userRepository } from "../../Data Access/Repository/userRepository";

export type PostsFeed = {
    name: string,
    nickname: string, 
    course: string,
    shift: string,
    post: Post,
}
const feedStateController = () => {
    const [posts, setPosts] = useState<PostsFeed[]>([])
    const postService: postServices = new postServices()
    const UserRepository: userRepository = new userRepository()

    const handleFeedFetch = async (): Promise<IReturnAdapter> => {    
        try {
            const req = await postService.getPosts()
            console.log(`Request: ${req.data}`);
            if (req.valido === false) {
                throw new Error("Bad Request");
            }
            const postData = req.data as Post[]
            postData.forEach(async post => {
                const newPost = new Post(
                    post.UserID, 
                    post.description, 
                    post.postId, 
                    post.local, 
                    post.status,
                    post.createdAt
                )
                const req = await UserRepository.getUserByUID(post.UserID)
                if(req.val === false){
                    return
                }
                const userData = req.data as User
                const newUser = new User(userData)
                const newPostFeed: PostsFeed = {
                    name: newUser.name,
                    nickname: newUser.nickname,
                    course: newUser.course,
                    shift: newUser.shift,
                    post: newPost
                }
                posts.push(newPostFeed)
            });
            console.log(posts)  
                return { val: true, data: 'Posts encontrados' };
         
        } catch (error) {
            console.log("handleFeedFetch respondeu com ERRO!")
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                  return { val: false, erro: error };
                } else if (error.message === "Nenhum post foi encontrado") {
                  return { val: false, erro: error };
                }
            }
              return { val: false, erro: "Internal Server Error" };
        }
    }

    return {
        posts,
        handleFeedFetch};
};

export { feedStateController }