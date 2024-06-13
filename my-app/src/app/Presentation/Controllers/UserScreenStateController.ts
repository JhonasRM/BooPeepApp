import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/Interfaces/UserStateAndSetters";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import MyUserService from "../../Service/business/MyUserService";

const UserScreenStateController = () => {
  const defaultUser: User = new User({})
  const [user, setUser] = useState<User>(defaultUser)
  const UserService: userService = new userService();

  const GetUserInfo = async (): Promise<IReturnAdapter> => {
    try {
      const MyUser = MyUserService.getInstance()
      const userInfo  = await MyUser.getUser()
      console.log(`User INFO from Instace: ${userInfo}`)
      if(userInfo === null){
      const email = await GetOnStorage('email')
      const req = await UserService.getUser(email.info, '')
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      const userData = req.data as User
      const displayName = req.data.displayName as string
      const GottenInfo = new User({ displayName: displayName, email: userData.email, uid: userData.uid, postID: userData.postID, chatID: userData.chatID })
      MyUser.setUser(GottenInfo)
      console.log(GottenInfo)
      setUser({
        uid: GottenInfo.uid,
        name: GottenInfo.name,
        nickname: GottenInfo.nickname,
        email: GottenInfo.email,
        password: GottenInfo.password,
        postID: GottenInfo.postID,
        chatID: GottenInfo.chatID,
        course: GottenInfo.course,
        shift: GottenInfo.shift,
        description: GottenInfo.description
      })
      console.log(user)
    return { val: true, data: 'Usuário encontrado' };
    }
    setUser(userInfo)
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
      const userInfo = new User({})
      setUser(userInfo)
      console.log('Limpando dados...')
      return { val: true, data: 'Dados descartados' }
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }

      return { val: false, erro: "Internal Server Error" };
    }
  }

  return {
    user,
    GetUserInfo,
    CleanUpUserInfo
  };
};

export { UserScreenStateController };
