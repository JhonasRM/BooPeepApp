import { View } from "react-native";
import HeaderBar from "../../../Service/components/HeaderBar";
import FeedArea from "../../../Service/components/FeedArea";
import FooterBar from "../../../Service/components/FooterBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const Feed = () => {
    const queryClient = new QueryClient();
    return (
     <QueryClientProvider client={queryClient}>
    <View>
        <HeaderBar />
        <FeedArea />
        <FooterBar />
    </View>
    </QueryClientProvider>
    )
}


export default Feed;