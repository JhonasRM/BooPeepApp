import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/Interfaces/UserStateAndSetters";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";

const UseScreenStateController = () => {
  const defaultUser: User = new User({})
  const [user, setUser] = useState<User>(defaultUser)
  const UserService: userService = new userService();

  const UpdateUserInfo = async (fieldToUpdate: string, newValue:string): Promise<IReturnAdapter> => {
    const email = await GetOnStorage('email')
    try {
      const req = await UserService.update(email, fieldToUpdate, newValue)
      if (req.val === false) {
        throw new Error(req.erro as string);
      }
      const userData = req.data as User
      const displayName = req.data.displayName as string
      console.log(displayName)
      const userInfo = new User({displayName: displayName, email: userData.email, uid: userData.uid, postID: userData.postID, chatID: userData.chatID})
      setUser(userInfo)
      return { val: true, data: 'Usuário encontrado' };
    } catch (error) {
      if (error instanceof Error) {
          return { val: false, erro: error.message };
        }
      
      return { val: false, erro: "Internal Server Error" };
    }
  };
  const CleanUpUserInfo = async(): Promise<IReturnAdapter> => {
    try {
      const userInfo = new User({})
      setUser(userInfo)
      console.log('Limpando dados...')
      return {val: true, data: 'Dados descartados'}
    } catch (error) {
      if (error instanceof Error) {
        return { val: false, erro: error.message };
      }
    
    return { val: false, erro: "Internal Server Error" };
    }
  }

  return {
    user,
    UpdateUserInfo,
    CleanUpUserInfo
  };
};

export { UseScreenStateController };
