import { useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator"
import { postServices } from "../../Service/API/postService"
import { Post } from "../../Service/Entities/postEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

const feedStateController = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const postService: postServices = new postServices()

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
 
            if (posts[0] instanceof Post) {
                setPosts(posts)
                return { val: true, data: 'Posts encontrados' };
            }
            throw new Error('Nenhum post foi encontrado')
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

    return {
        posts,
        handleFeedFetch};
};

export { feedStateController }