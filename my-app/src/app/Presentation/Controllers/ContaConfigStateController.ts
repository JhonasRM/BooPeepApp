import { userRepository } from "../../Data Access/Repository/userRepository"
import { GetOnStorage } from "../../Data Access/Storage/GetOnStorage"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter"

const ContaConfigStateController = () => {
    const userRep =  new  userRepository()
    const DeleteUser = async(): Promise<IReturnAdapter> => {
        const emailGet =  await GetOnStorage('email')
        try {
            const deleteUser = await userRep.delete(emailGet.info)
            if(deleteUser.val === false){
                throw new Error(deleteUser.erro)
            }
            return{val: true, erro: deleteUser.data}
        } catch (error) {
            if(error instanceof Error){
                return {val: false, erro: error.message}
            }
            return{val: false, erro: `Erro interno da aplicação. Tente novamente mais tarde`}
        }
    }

    return {
        DeleteUser
    }
}

export {  ContaConfigStateController }
