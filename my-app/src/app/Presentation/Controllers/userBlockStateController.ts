import { useState } from "react";
import { postServices } from "../../Service/API/postService";
import { postStateAndSetters } from "../../utils/Interfaces/postStateAndSetters";
import { Post } from "../../Service/Entities/postEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import UserPersistence from "../../Service/Persistence/UserPersistence";
import { userRepository } from "../../Data Access/Repository/userRepository";
import { User } from "../../Service/Entities/userEntities";

const userBlockStateController = () => {
  const [postsID, setPostsID] = useState<string[]>([]);

  const postService: postServices = new postServices();
  const posts: Post[] = [];
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
      postsID.forEach(async (postID) => {
        const req = await postService.getPostFromUser(postID);
        console.log(`Request: ${req}`);
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
        posts.push(newPost);
      });
      if (posts.length === 0) {
        throw new Error("Nenhum post encontrado.");
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
  };

  return {
    postsID,
    GetPostID,
    handleFetchUserPosts,
  };
};

export { userBlockStateController };
