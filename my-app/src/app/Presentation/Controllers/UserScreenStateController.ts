import { useState, useEffect } from "react";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import UserPersistence from "../../Service/Persistence/UserPersistence";
import { userRepository } from "../../Data Access/Repository/userRepository";
import ChatPersistence from "../../Service/Persistence/chatPersistence";

const UserScreenStateController = () => {
  const defaultUser = new User({
    displayName: "", 
          email: "", 
          course: "", 
          shift: "", 
          description: ""
  })
  const [postsID, setPostsID] = useState<string[]>([])
  const [user, setUser] = useState<User>(defaultUser);
  const uRepository: userRepository = new userRepository();

  const GetUserInfo = async (): Promise<IReturnAdapter> => {
    try {
      const MyUser = await UserPersistence.getInstance();
        const email = await GetOnStorage('email');
        const req = await uRepository.getUser(email.info, '');
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
          description: userData.description 
        });
        const chat = ChatPersistence.getInstance()
        chat.setChatID(userData.chatID)
        MyUser.setUser(GottenInfo);
        setUser(GottenInfo);
        setPostsID(req.data.postsID)
        return { val: true, data: 'Usuário encontrado' };
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  };

  const CleanUpUserInfo = async (): Promise<IReturnAdapter> => {
    try {
      const userInfo = new User({});
      setUser(userInfo);
      console.log('Limpando dados...');
      return { val: true, data: 'Dados descartados' }
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
      return { val: false, erro: "Internal Server Error" };
    }
  }


  return {
    defaultUser,
    user,
    postsID,
    GetUserInfo,
    CleanUpUserInfo
  };
};

export { UserScreenStateController };
