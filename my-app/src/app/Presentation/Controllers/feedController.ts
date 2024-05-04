import { useQuery } from "@tanstack/react-query";
import postServices from "../../Service/API/postAPIService";

const feedController = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['data'],
        queryFn: async () => {const queryFunction = new postServices();
            return await queryFunction.fetchPosts();
        },
    });
    return { data, isLoading, isError, error }
}

export default feedController