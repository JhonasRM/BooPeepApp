import { View } from "react-native";
import HeaderBar from "../../../Service/components/HeaderBar";
import FeedArea from "../../../Service/components/FeedArea";
import FooterBar from "../../../Service/components/FooterBar";



const Feed = () => {
    return (
    <View>
        <HeaderBar />
        <FeedArea />
        <FooterBar />
    </View>
    )
}


export default Feed;