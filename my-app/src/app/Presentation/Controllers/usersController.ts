import { useQuery } from "@tanstack/react-query"
import userServices from "../../Service/API/userAPIService";

const usersController = () => {
    const {data, isError, error} = useQuery({
        queryKey: ['userdata'],
        queryFn: async () => {const userQueryFunction = new userServices();
            return await userQueryFunction.fetchUsers();
        },
    });

    return { data, isError, error }
}

export default usersController;