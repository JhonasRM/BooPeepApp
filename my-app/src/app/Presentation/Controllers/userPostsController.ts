import { useQuery } from "@tanstack/react-query"
import postServices from "../../Service/API/postAPIService"

//VERIFICAR A API, ENTÃO VER SE ELE SÓ PEGA OS POSTS DO USUÁRIO
const userPostsController = ({UserID}: any) => {
    const {data, isError, isLoading, error} = useQuery({
        queryKey: ['userpostdata'],
        queryFn: async () => {
            const userPostsFunction = new postServices();
            return await userPostsFunction.fetchPostsfromUser(UserID);
        }
    })
    return {data, isError, isLoading, error}
}

export default userPostsController;