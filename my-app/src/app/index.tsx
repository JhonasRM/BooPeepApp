//import { SafeAreaView } from "react-native-safe-area-context";
import Feed from "./Presentation/View/screens/Feed";
import StyleSheet from "react-native-media-query";

export default function App() {  
  return (
    <Feed />
  );
}

const {styles} = StyleSheet.create({
  app: {
    flex: 1,
  }
})