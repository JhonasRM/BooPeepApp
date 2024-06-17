
import { User } from "../../Service/Entities/userEntities";
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter";
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage";
import { userRepository } from "../../Data Access/Repository/userRepository";

interface FieldUpdate {
  fieldToUpdate: string;
  NewValue: any;
}

const ChangeDataStateController = () => {
  const uRepository: userRepository = new userRepository();
  const UpdateUserInfo = async (user: User, profileData: User): Promise<IReturnAdapter> => {
    try{
    const updatedFields: FieldUpdate[] = [];
    Object.keys(user).forEach(key => {
      const typedKey = key as keyof User;
      if (typedKey !== 'uid' && typedKey !== 'postID' && typedKey !== 'chatID' && typeof user[typedKey] === 'string' && user[typedKey] !== profileData[typedKey]) {
      if(typedKey === 'name' || typedKey === 'nickname'){
        const treatedKey = 'displayName'
        let newValue: string =  ''
        if(profileData.nickname === '' || profileData.nickname === ' '){
          let newValue = `${profileData[typedKey]} ${user.nickname}`
        }
        if(profileData.name === ''|| profileData.name === ' ' ){
          let newValue = `${user.name} ${profileData[typedKey]}`
        } else{
        let newValue = `${profileData.name} ${profileData.nickname}`
      }
        updatedFields.push({
          fieldToUpdate: treatedKey,
          NewValue: newValue
      })
      } else if(typedKey==='course' || typedKey === 'description' || typedKey === 'email' || typedKey === 'password' || typedKey === 'shift'){
        updatedFields.push({
          fieldToUpdate: key,
          NewValue: profileData[typedKey]
      })
    } else{
      return
    }
    }
  });
  updatedFields.forEach(async (updatedInfo) => {
    let fieldToUpdate = updatedInfo.fieldToUpdate
    let newValue = updatedInfo.NewValue
    
    if(newValue === '' || newValue === ' '){
      return
    }
    try {
      const email = await GetOnStorage('email')
        const req = await uRepository.update(email.info, fieldToUpdate, newValue)
        if (req.val === false) {
          throw new Error(req.erro as string);
        }
        return
      } catch (error) {
        if (error instanceof Error) {
            throw new Error('Erro ao atualizar dados do usuário: ' + error.message);
          }
        throw new Error(`Erro interno da aplicação: ${error}`);
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

  return {
    UpdateUserInfo,
  };
};

export { ChangeDataStateController };
