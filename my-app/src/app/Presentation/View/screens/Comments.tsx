import React, { useState } from "react"
import { GestureResponderEvent, ScrollView, StyleSheet, Text, View } from "react-native"
import CommentButton from "../components/CommentButton"
import { SafeAreaView } from "react-native-safe-area-context"
import HeaderBar from "../components/HeaderBar"
import CommentArea from "../components/Comments/CommentArea"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const Comments = () => {
    const queryClient = new QueryClient()

    return (
    <QueryClientProvider client={queryClient}>
        <View>
            <HeaderBar whatScreen="comment" />
            <CommentArea />
        </View>
    </QueryClientProvider>
    )
}

export default Comments
