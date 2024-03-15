
import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "./src/Presentation/View/screens/Feed";
import StyleSheet from "react-native-media-query";

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <Feed />
    </SafeAreaView>
  );
}

const {styles} = StyleSheet.create({
  app: {
    flex: 1,
  }
})