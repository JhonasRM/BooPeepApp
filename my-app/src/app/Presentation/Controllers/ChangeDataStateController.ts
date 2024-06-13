import { SetStateAction, useState } from "react";
import { userValidator } from "../../Service/Validators/userValidator";
import { userService } from "../../Service/API/userServices";
import { StateAndSetters } from "../../utils/Interfaces/UserStateAndSetters";
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";

interface FieldUpdate {
  fieldToUpdate: string;
  NewValue: any;
}

const ChangeDataStateController = () => {
  const defaultUser: User = new User({})
  const [user, setUser] = useState<User>(defaultUser)
  const UserService: userService = new userService();
  const UpdateUserInfo = async (user: User, profileData: User): Promise<IReturnAdapter> => {
    try{
    const updatedFields: FieldUpdate[] = [];
    Object.keys(user).forEach(key => {
      const typedKey = key as keyof User;
      if (typedKey !== 'uid' && typedKey !== 'postID' && typedKey !== 'chatID' && typeof user[typedKey] === 'string' && user[typedKey] !== profileData[typedKey]) {
        updatedFields.push({
          fieldToUpdate: key,
          NewValue: profileData[typedKey]
      })
      }
  });
  updatedFields.forEach(async (updatedInfo) => {
    let fieldToUpdate = updatedInfo.fieldToUpdate
    let newValue = updatedInfo.NewValue
    try {
      const email = await GetOnStorage('email')
        const req = await UserService.update(email.info, fieldToUpdate, newValue)
        if (req.val === false) {
          throw new Error(req.erro as string);
        }
        return
        console.log(req.data)
      } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message );
          }
        throw new Error('Erro interno da aplicação');
      }
  })
  return { val: true, data: 'Usuário alterado com sucesso!' };
}catch (error) {
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

export { ChangeDataStateController };
