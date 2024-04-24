import { View } from "react-native";
import HeaderBar from "../components/HeaderBar";
import FeedArea from "../components/Feed/FeedArea";
import FooterBar from "../components/FooterBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CreatePost from "../components/Feed/CreatePost";
import React from "react";



const Feed = () => {
    const queryClient = new QueryClient();
    return (
     <QueryClientProvider client={queryClient}>
    <View>
        <HeaderBar whatScreen="feedchat"/>
        <FeedArea />
        <CreatePost />
        <FooterBar whatScreen="feed"/>
    </View>
    </QueryClientProvider>
    )
}


export default Feed;