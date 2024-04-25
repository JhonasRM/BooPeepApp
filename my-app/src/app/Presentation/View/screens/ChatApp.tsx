import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import FooterBar from '../components/FooterBar';
import { MaterialIcons } from '@expo/vector-icons';

interface Message {
  id: string;
  text: string;
}

export default function App(): JSX.Element {
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleMessageSend = (): void => {
    if (message.trim() === '') return;
    const newMessage: Message = {
      id: String(messages.length + 1),
      text: message.trim(),
    };
    setMessages([...messages, newMessage]);
    setMessage('');
   
    scrollViewRef.current?.scrollToEnd({ animated: true });
  };

  const renderMessages = (): JSX.Element[] => {
    return messages.map((message) => (
      <View
        style={[
          styles.messageContainer,
          { alignSelf: 'flex-end' }, 
        ]}
        key={message.id}
      >
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <HeaderBar whatScreen='chat'/>
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
      <FooterBar whatScreen='chat'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  messagesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    backgroundColor: '#7C83FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  messageText: {
    fontSize: 16,
    color: '#ffffff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#202112',
    backgroundColor: '#ffffff',
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#ffffff',
  },
  sendButton: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonIcon: {
    backgroundColor: '#ffffff', 
  },
});
