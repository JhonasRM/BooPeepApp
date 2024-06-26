import React, { useState } from "react";
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { User } from "../../../Service/Entities/userEntities";
import CommentArea from "./Comments/CommentArea";

type CommentBtnProps = {
    btnStyle: StyleProp<ImageStyle>;
    postID: string,
    user: User
};

const CommentButton = (props: CommentBtnProps) => {
    const [isCommentPress, setCommentIsPress] = useState(false);

    const commentHandlePress = () => {
        setCommentIsPress((isCommentPress) => !isCommentPress);
    };

    return (
        <>
            {isCommentPress && <CommentArea postID={props.postID} user={props.user} />}
            <TouchableOpacity onPress={commentHandlePress} style={props.btnStyle}>
                <Image
                    source={require('../../../../../assets/icons/icons8-mensagens-100_Feed.png')}
                    style={styles.img}
                />
            </TouchableOpacity>
        </>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 35,
        height: 35,
    },
});

export default CommentButton;
