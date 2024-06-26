import { useState } from "react";
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters";
import { Post } from "../../Service/Entities/postEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import UserPersistence from "../../Service/Persistence/UserPersistence";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { User } from "../../Service/Entities/userEntities";
import { postRepository } from "../../Data Access/Repository/postRepository";

const userBlockStateController = () => {
  const [postsID, setPostsID] = useState<string[]>([]);
  let postsData: Post[] = []
  const pRepository: postRepository = new postRepository();
  const [posts, setPosts] = useState<Post[]>(postsData)
  const uRepository: userRepository = new userRepository();

  const GetPostID = async (): Promise<IReturnAdapter> => {
    try {
      const email = await GetOnStorage("email");
      const req = await uRepository.getUser(email.info, "");
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      const userData = req.data as User;
      const displayName = req.data.displayName as string;
      const GottenInfo = new User({
        displayName: displayName,
        email: userData.email,
        uid: userData.uid,
        postID: userData.postID,
        chatID: userData.chatID,
        course: userData.course,
        shift: userData.shift,
        description: userData.description,
      });
      if (GottenInfo.postID.length !== 0) {
        setPostsID(GottenInfo.postID);
      }
      console.log(`postsID: ${postsID}`);
      return { val: true, data: "Usuário encontrado" };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  };

  const handleFetchUserPosts = async (
    postsID: string[]
  ): Promise<IReturnAdapter> => {
    try {
      await postsID.forEach(async (postID) => {
        const req = await pRepository.getPostFromUser(postID);
        if (req.valido === false) {
          throw new Error("Bad Request");
        }
          console.log(req.data)
        const post = req.data as unknown as Post;
        const newPost = new Post(
          post.UserID,
          post.description,
          post.local,
          post.postId,
          post.status,
          post.createdAt
        );
        console.log('post criado: ', newPost)
        await SettingPost(newPost)
      });
      return { val: true, data: postsData };
    }
     catch (error) {
      console.log(error)
          return { val: false, erro: error as string };
        }
      }
  
   const SettingPost = (newPost: Post) => {
    postsData.push(newPost);
    console.log('postData: ', postsData)
   }

  return {
    posts,
    GetPostID,
    handleFetchUserPosts,
  };
};

export { userBlockStateController };
