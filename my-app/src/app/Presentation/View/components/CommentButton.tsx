import React, { useState } from "react"
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from "react-native"
import Comments from "../screens/Comments"
import { Link } from "expo-router"

type CommentBtnProps = {
    btnStyle: StyleProp<ImageStyle>
}

const CommentButton = (props: CommentBtnProps) => {
    const [isCommentPress, setCommentIsPress] = useState(false);

    const commentHandlePress = () => {
        setCommentIsPress(isCommentPress => !isCommentPress)
    }

    return (
        <Link href={"../screens/Comments"} asChild>
            <TouchableOpacity onPress={commentHandlePress} style={props.btnStyle}>
                <Image source={require('../../../../../assets/icons/icons8-mensagens-100_Feed.png')} style={styles.img}/>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create ({
    img: {
        width: 35,
        height: 35,
    },
})

export default CommentButton