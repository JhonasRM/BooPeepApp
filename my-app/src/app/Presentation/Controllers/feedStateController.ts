import { useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator"
import { postRepository } from "../../Data Access/Repository/postRepository"
import { Post } from "../../Service/Entities/postEntities"
import { User } from "../../Service/Entities/userEntities";
import { userRepository } from "../../Data Access/Repository/userRepository";

const feedStateController = () => {
    //const [title, setTitle] = useState("")
    const [createdAt, setCreatedAt] = useState(0)
    const [UserID, setUserID] = useState("")
    const [description, setDescription] = useState("")
    const [postId, setPostId] = useState("")
    const [local, setLocal] = useState("")
    const [status, setStatus] = useState(0)

    // const validator: postValidator = new postValidator()
    const pRepository: postRepository = new postRepository()
    const uRepository: userRepository = new userRepository()
    // const handleFeedFetch = async (/*title: string,*/ description: string, local: string, status: number, createdAt: number): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> {
        
    // }

    const handleFeedFetch = async (): Promise<{
        valido: boolean, 
        value?: number, 
        erro?: string | Error, 
        data?: Post[]
    }> => {    
        try {
            const req = await pRepository.getPosts()
            console.log(`Post Request: ${req}`);
            if (req.valido === false) {
                throw new Error("Bad Request");
            }

            const postData = req.data as Post[]

            let posts: Post[] = []
            postData.forEach(post => {
                const newPost = new Post(
                    post.UserID, 
                    post.description, 
                    post.local, 
                    post.postId, 
                    post.status,
                    post.createdAt
                )

                posts.push(newPost)
            });
            posts.forEach(async(post: Post) => {
                post.setUser()
            })

            if (posts[0] instanceof Post) {
                return { valido: true, value: 200, data: posts };
            }

            throw new Error('Nenhum post encontrado.')
        } catch (error) {
            console.log("handleFeedFetch respondeu com ERRO!")

            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                  return { valido: false, value: 401, erro: error };
                } else if (error.message === "Bad Request") {
                  return { valido: false, value: 400, erro: error };
                }
            }
              return { valido: false, value: 500, erro: "Internal Server Error" };
        }
    }

    return {
        createdAt,
        UserID, 
        description, 
        postId, 
        local, 
        status, 
        handleFeedFetch};
};

export { feedStateController }