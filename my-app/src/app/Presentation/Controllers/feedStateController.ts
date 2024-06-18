import { useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator"
import { postRepository } from "../../Data Access/Repository/postRepository"
import { Post } from "../../Service/Entities/postEntities"
import { User } from "../../Service/Entities/userEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";

const feedStateController = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [users, setUsers] = useState<User[]>([])
    const postrepository: postRepository = new postRepository()

    // const handleUserFetch = async (): Promise<IReturnAdapter> => {
    //     try {
    //         const req = await postrepository.getUsers()
    //         console.log(`User Request: ${req}`);
    //         if (req.val === false) {
    //             throw new Error("Bad Request");
    //         }
    //         const usersData = req.data as User[]
    //         let users: User[] = []
    //         usersData.forEach(user => {
    //             const newUser = new User(
    //                 user
    //             )
    //             users.push(newUser)
    //         });

    //         if (users[0] instanceof User) {
    //             setUsers(users)
    //             return { val: true, data: 'Usuários encontrados' };
    //         }
    //         throw new Error('Nenhum post foi encontrado')
    //     } catch (error) {
    //         console.log("handleUserFetch respondeu com ERRO!")
    //         if (error instanceof Error) {
    //             if (error.message === "Unauthorized") {
    //               return { val: false, erro: error };
    //             } else if (error.message === "Bad Request") {
    //               return { val: false, erro: error };
    //             }
    //         }
    //           return { val: false, erro: "Internal Server Error" };
    //     }
    // }

    const handleFeedFetch = async (): Promise<IReturnAdapter> => {    
        try {
            const req = await postrepository.getPosts()
            console.log(`Post Request: ${req}`);
            if (req.valido === false) {
                throw new Error("Bad Request");
            }
            const postData = req.data as Post[]
            let posts: Post[] = []
            postData.forEach(post => {
                const newPost = new Post(
                    post.UserID, 
                    post.createdAt,
                    post.description, 
                    post.local, 
                    post.postId, 
                    post.status,
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