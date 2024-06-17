import { View } from "react-native";
import HeaderBar from "../components/HeaderBar";
import FeedArea from "../components/Feed/FeedArea";
import FooterBar from "../components/FooterBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React, { useState } from "react";
import PostForm from "../components/CreatePost";
import CreatePost from "../components/CreatePost";

type Props = {
    isTouched?: any
    pressedEdit?: any
    stopEdit?: any
}

const Feed = (props: Props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [pressedEdit, isPressingEdit] = useState(false)
    const [stopEdit, isStoppingEdit] = useState(false)
    const queryClient = new QueryClient();

    const handleFeedAreaEditResponse = (response: any) => {
        setIsEditing(response)
    }

    const handleContainerOptionsEditBtnPress = (response: any) => {
        isPressingEdit(response);
    }

    const handlePostFormEditDenial = (response: any) => {
        isStoppingEdit(response)
    }

    return (
     <QueryClientProvider client={queryClient}>
    <View>
        <HeaderBar whatScreen="feed"/>
        <FeedArea isTouched={handleFeedAreaEditResponse} pressedEdit={handleContainerOptionsEditBtnPress} stopEdit={stopEdit}/>
        <CreatePost isTouched={isEditing} pressedEdit={pressedEdit} stopEdit={handlePostFormEditDenial}/>
        <FooterBar whatScreen="feed"/>
    </View>
    </QueryClientProvider>
    )
}


export default Feed;