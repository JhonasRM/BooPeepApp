import React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import CommentBlock from "./CommentBlock";
import PostBlock from "./PostBlock";

const CommentArea = () => {
    return (        
    <ScrollView style={styles.container}>
        <PostBlock />
        <CommentBlock />
        
    </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 7,
        paddingVertical: 7,
        width: wp(100),
        height: hp(87.8),
    }
})

export default CommentArea