import { useState } from "react"
import { postServices } from "../../Service/API/postService"
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters"
import { Post } from "../../Service/Entities/postEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter"

const userBlockStateController = () => {

    const postService: postServices = new postServices()
    const posts: Post[] = []
    const handleFetchUserPosts = async (postsID:string[]): Promise<IReturnAdapter> => {
         try {
        postsID.forEach(async(postID) => {
            const req = await postService.getPostFromUser(postID)
            console.log(`Request: ${req}`);
            if (req.valido === false) {
                throw new Error("Bad Request");
            }
            const post = req.data as unknown as Post
                const newPost = new Post(
                    post.UserID, 
                    post.description, 
                    post.local, 
                    post.postId, 
                    post.status,
                    post.createdAt
                )
                posts.push(newPost)
        })
            if (!posts[1]) {
                throw new Error('Nenhum post encontrado.')
            }
                return { val: true, data: posts };
        } catch (error) {
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

    return {
        handleFetchUserPosts
    };
}

export { userBlockStateController }