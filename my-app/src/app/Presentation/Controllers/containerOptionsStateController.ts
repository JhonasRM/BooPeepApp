import { postRepository } from "../../Data Access/Repository/postRepository"
import { IReturnAdapter } from "../../utils/Interfaces/IReturnAdapter"

const containerOptionsStateController = () => {
    const postRep = new postRepository()

    const DeletePost = async(deleteThis: string): Promise<IReturnAdapter> => {
        try {
            const deletePost = await postRep.deletePost(deleteThis)

            if (deletePost.val === false) {
                throw new Error(deletePost.erro)
            }

            return {val: true, erro: deletePost.data}
        } catch (error) {
            if(error instanceof Error){
                return {val: false, erro: error.message}
            }
            return{val: false, erro: `Erro interno da aplicação. Tente novamente mais tarde`}
        }
    }

    return {
        DeletePost
    }
}

export { containerOptionsStateController }