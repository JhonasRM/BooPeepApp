import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "../Presentation/View/screens/Feed";
import StyleSheet from "react-native-media-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={styles.app}>
        <Feed />
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const {styles} = StyleSheet.create({
  app: {
    flex: 1,
  }
})