import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import HeaderBar from "../components/HeaderBar";
import FooterBar from "../components/FooterBar";
import { MaterialIcons } from "@expo/vector-icons";
import { GetOnStorage } from "../../../Data Access/Storage/GetOnStorage";
import { ChatStateController } from "../../Controllers/ChatStateController";
import { Chat } from "../../../Service/Entities/chatEntities";
import { Message } from "../../../Service/Entities/messageEntities";
import { ChatMessageHelper } from "../../../utils/Helpers/ChatMessagesHelper";
import { setYear } from "date-fns";
import { Info, MessageSquareMore } from "@tamagui/lucide-icons";

export default function App(): JSX.Element {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessageHelper[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const { getchat, sendMessage, readMessages } = ChatStateController();
  const [chat, setChat] = useState<Chat | null>(null);
  const uid = GetOnStorage("uid");
  const [isUpdated, setIsUpdated] = useState<boolean>();

  const handleMessageSend = async () => {
    if (message.trim() === "") return;
    try {
      const newMessage: ChatMessageHelper = new ChatMessageHelper({
        uid: (await uid).info,
        text: message,
      });
      setMessages([...messages, newMessage]);
      setMessage("");
      if (chat === null) {
        const getMyChat = await getchat();
        if (getMyChat.val === false) {
          throw new Error(getMyChat.erro as string);
        }
        const MyChat = getMyChat.data as Chat;
        setChat(MyChat);
      }
      const sendNewMessage = await sendMessage(message);
      if (sendNewMessage.val === false) {
        throw new Error(sendNewMessage.erro as string);
      }
      const Chat = chat as Chat;
      const MyMessage = newMessage.getMessage();
      Chat.messages?.push(await MyMessage);
      setIsUpdated(false);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.log(error)
    }
   
  };

  useEffect(() => {
    const getMyChat = async () => {
      const chatID = await GetOnStorage("chatID");
      if (chatID.info === "") {
        return;
      } else {
        const get = await getchat();
        if (get.val === false) {
          console.log(get.erro);
        }
        const myChat = get.data;
        setChat(get.data as Chat);
      }
    };
    getMyChat();
    
    return () => {
      setIsUpdated(false);
    };
  }, []);

  useEffect(() => {
    const readChat = async() =>{
      const read = await readMessages()
      if(read.val === false){
        throw new Error(read.erro as string)
      }
      const myChat = read.data;
      setChat(read.data as Chat);
      let MyMessages: ChatMessageHelper[] = [];
      myChat.messages?.forEach((MyLastMessage: Message) => {
        const newMesage: ChatMessageHelper = new ChatMessageHelper(
          {message: MyLastMessage}
        );
        MyMessages.push(newMesage);
      });
      setMessages(MyMessages);
    }
    readChat()
  }, [isUpdated])

  const renderMessages = (): JSX.Element[] => {
    return messages.map((message) => (
      <View
        style={[styles.messageContainer, { alignSelf: "flex-end" }]}
        key={message.uid}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <HeaderBar whatScreen="chat" whatLink="../screens/Feed" />
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.messagesContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {renderMessages()}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleMessageSend}>
          <View style={styles.sendButtonIcon}>
            <MaterialIcons name="send" size={24} color="#400096" />
          </View>
        </TouchableOpacity>
      </View>
      <FooterBar whatScreen="chat" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    backgroundColor: "#7C83FF",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    color: "#ffffff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#202112",
    backgroundColor: "#ffffff",
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "#ffffff",
  },
  sendButton: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonIcon: {
    backgroundColor: "#ffffff",
  },
});
