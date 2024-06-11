import { View } from "react-native";
import HeaderBar from "../components/HeaderBar";
import FeedArea from "../components/Feed/FeedArea";
import FooterBar from "../components/FooterBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import React from "react";
import PostForm from "../components/PostForm";



const Feed = () => {
    const queryClient = new QueryClient();
    return (
     <QueryClientProvider client={queryClient}>
    <View>
        <HeaderBar whatScreen="feed"/>
        <FeedArea />
        <PostForm />
        <FooterBar whatScreen="feed"/>
    </View>
    </QueryClientProvider>
    )
}


export default Feed;