import { useState } from "react"
import { postValidator } from "../../Service/Validators/postValidator"
import { postRepository } from "../../Data Access/Repository/postRepository"
import { Post } from "../../Service/Entities/postEntities"
import { User } from "../../Service/Entities/userEntities"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { userRepository } from "../../Data Access/Repository/userRepository"
import { PostFeed } from "../../utils/types/PostFeed"

const feedStateController = () => {
    const [posts, setPosts] = useState<PostFeed[]>([])
    const postrepository: postRepository = new postRepository()
    const userrepository: userRepository = new userRepository()
    const handleFeedFetch = async (): Promise<IReturnAdapter> => {    
        try {
            const req = await postrepository.getPosts();
            if (req.valido === false) {
                throw new Error("Bad Request");
            }
            const postData = req.data as Post[];
            let posts: PostFeed[] = [];
            
            await Promise.all(postData.map(async (post) => {
                const newPost = new Post(
                    post.UserID, 
                    post.description, 
                    post.local, 
                    post.postId, 
                    post.status,
                    post.createdAt,
                );
                const reqUser = await userrepository.getUserByUID(newPost.UserID);
                if(reqUser.val === false){
                    console.log(reqUser.erro as string);
                    console.log(`Erro ao requisitar os dados do post ${newPost.postId}`);
                    return;
                }
                const user = reqUser.data as User;
                const newUser = new User({
                    displayName: reqUser.data.displayName,
                    course: user.course,
                    shift: user.shift,
                });
                const newPostFeed: PostFeed = {
                    user: newUser,
                    post: newPost,
                };
                posts.push(newPostFeed);
            }));
    
            if (posts.length > 0) {
                setPosts(posts);
                return { val: true, data: 'Posts encontrados' };
            }
            throw new Error('Nenhum post foi encontrado');
        } catch (error) {
            console.log("handleFeedFetch respondeu com ERRO!");
            if (error instanceof Error) {
                if (error.message === "Unauthorized") {
                    return { val: false, erro: error };
                } else if (error.message === "Bad Request") {
                    return { val: false, erro: error };
                }
            }
            return { val: false, erro: "Internal Server Error" };
        }
    };
    

    return {
        posts,
        handleFeedFetch};
};

export { feedStateController }