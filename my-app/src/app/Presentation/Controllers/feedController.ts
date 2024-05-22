import { useQuery } from "@tanstack/react-query";
import postServices from "../../Service/API/postAPIService";

const feedController = () => {
    const {data, isLoading, isError, error} = useQuery({
        queryKey: ['feeddata'],
        queryFn: async () => {const feedQueryFunction = new postServices();
            return await feedQueryFunction.fetchPosts();
        },
    });
    
    return { data, isLoading, isError, error }
}

export default feedController