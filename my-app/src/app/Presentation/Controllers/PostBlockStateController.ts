import { useState } from "react";
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters";
import { Post } from "../../Service/Entities/postEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import UserPersistence from "../../Service/Persistence/UserPersistence";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { User } from "../../Service/Entities/userEntities";
import { postRepository } from "../../Data Access/Repository/postRepository";

const PostBlockStateController = () => {
    const [post, setPost] = useState<Post>();
    const pRepository: postRepository = new postRepository();
    const uRepository: userRepository = new userRepository();
    const [loggedUser, setLoggedUser] = useState<any>()


    const handleFetchPost = async (postID: string): Promise<IReturnAdapter> => {
        let myUser = await GetOnStorage('uid')
        try {
                const req = await pRepository.getPostFromUser(postID);
                if (req.valido === false) {
                    throw new Error("Bad Request");
                }
                const post = req.data as unknown as Post;
                const newPost = new Post(
                    post.UserID,
                    post.description,
                    post.local,
                    post.postId,
                    post.status,
                    post.createdAt
                );
            setPost(newPost);
            setLoggedUser(myUser.info);
            console.log(`THIS USER: ${loggedUser}`);
            return { val: true, data: post };
        } catch (error) {
            console.log(error);
            return { val: false, erro: error as string };
        }
    };

    return {
        post,
        loggedUser,
        handleFetchPost,
    };
};

export { PostBlockStateController };
