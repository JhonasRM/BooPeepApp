import { useState } from "react"
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters"
import { Post } from "../../Service/Entities/postEntities"
import { postRepository } from "../../Data Access/Repository/postRepository"

const commentPostBlockStateController = () => {
        //const [title, setTitle] = useState("")
        const [createdAt, setCreatedAt] = useState(0)
        const [UserID, setUserID] = useState("")
        const [description, setDescription] = useState("")
        const [postId, setPostId] = useState("")
        const [local, setLocal] = useState("")
        const [status, setStatus] = useState(0)
    
        const postrepository: postRepository = new postRepository()
    
        const handleFetchSpecificPost = async (): Promise<{
            valido: boolean, 
            value?: number, 
            erro?: string | Error, 
            data?: Post[]
        }> => {
             try {
                const req = await postrepository.getSpecificPost("0")

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
                        post.createdAt,
                    )

                    posts.push(newPost)
                });

                if (posts[0] instanceof Post) {
                    return { valido: true, value: 200, data: posts };
                }

                throw new Error('Nenhum post encontrado.')
            } catch (error) {
                console.log("handleFetchSpecificPost respondeu com ERRO!")
    
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
            handleFetchSpecificPost
        };
}

export { commentPostBlockStateController }