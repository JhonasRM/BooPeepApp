import { useState } from "react"
import { postServices } from "../../Service/API/postService"
import { postStateAndSetters } from "../../utils/types/Interfaces/postStateAndSetters"
import { Post } from "../../Service/Entities/postEntities"

const commentPostBlockStateController = () => {
        //const [title, setTitle] = useState("")
        const [createdAt, setCreatedAt] = useState(0)
        const [UserID, setUserID] = useState("")
        const [description, setDescription] = useState("")
        const [postId, setPostId] = useState("")
        const [local, setLocal] = useState("")
        const [status, setStatus] = useState(0)
    
        const postService: postServices = new postServices()
    
        const handleFetchSpecificPost = async (
            createdAt: number,
            UserID: string, 
            description: string, 
            postId: string, 
            local: string, 
            status: number 
        ): Promise<{valido: boolean, value?: number, erro?: string | Error, data?: Post}> => {
    
            const post: Post = new Post (
                createdAt,
                UserID,
                description,
                postId,
                local,
                status
             );   
    
             try {
                console.log(post)
                const req = await postService.getSpecificPost(post)
                if (req.valido === false) {
                    throw new Error("Bad Request");
                }
                return { valido: true, value: 200, data: post };
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