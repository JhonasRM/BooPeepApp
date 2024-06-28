import React from 'react';
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';

type CommentBtnProps = {
    btnStyle: StyleProp<ImageStyle>;
    postID: string;
    user: any;
};

const CommentButton = (props: CommentBtnProps) => {
    return (
        <Link href={{ pathname: './Comments', params: { postID: props.postID, user: JSON.stringify(props.user) } }} asChild>
            <TouchableOpacity style={props.btnStyle}>
                <Image source={require('../../../../../assets/icons/icons8-mensagens-100_Feed.png')} style={styles.img} />
            </TouchableOpacity>
        </Link>
    );
};

const styles = StyleSheet.create({
    img: {
        width: 35,
        height: 35,
    },
});

export default CommentButton;
