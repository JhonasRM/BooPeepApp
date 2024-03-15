import { View, ScrollView } from "react-native";
import StyleSheet from 'react-native-media-query';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FeedBlock from "../components/FeedBlock";
import { ids } from "./FeedAreaResponsivity";

const FeedArea = () => {
    return (
        <View style={styles.feed} dataSet={{ media: ids.feed }}>
            <ScrollView >
                <FeedBlock />
                <FeedBlock />
                <FeedBlock />
            </ScrollView>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    feed: {
        backgroundColor: "#d4d7ff",
        width: wp(102),
        height: hp(82),
    }
})

export default FeedArea