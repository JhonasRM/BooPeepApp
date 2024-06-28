import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CommentBlock from './CommentBlock';
import PostBlock from './PostBlock';
import { User } from '../../../../Service/Entities/userEntities';

const CommentArea = () => {
    const { postID, user } = useLocalSearchParams();
    const userObj = JSON.parse(user as string);

    return (
        <ScrollView style={styles.container}>
            <PostBlock postID={postID as string} user={userObj} />
            <CommentBlock postID={postID as string} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 7,
        paddingVertical: 7,
        width: wp(100),
        height: hp(87.8),
    },
});

export default CommentArea;
