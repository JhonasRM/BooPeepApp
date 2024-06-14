import { View, ScrollView } from "react-native";
import StyleSheet from 'react-native-media-query';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FeedBlock from "./FeedBlock";
import { ids } from "./FeedAreaResponsivity";
import React from "react";

type Props = {
    isTouched?: any
    pressedEdit?: any
    stopEdit?: any
}

const FeedArea = (props: Props) => {
    const handleFeedBlockEditResponse = (response: any) => {
        props.isTouched(response)
    }
    
    return (
        <View style={styles.feed} dataSet={{ media: ids.feed }}>
            <ScrollView >
                <FeedBlock isTouched={handleFeedBlockEditResponse} pressedEdit={props.pressedEdit} stopEdit={props.stopEdit}/>
            </ScrollView>
        </View>
    )
}

const {styles} = StyleSheet.create ({
    feed: {
        backgroundColor: "#d4d7ff",
        width: wp(100),
        height: hp(82),
    }
})

export default FeedArea