import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import HeaderBar from '../../../Service/components/HeaderBar';
import FooterBar from '../../../Service/components/FooterBar';

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
      <View style={styles.messageContainer} key={message.id}>
        <Text style={styles.messageText}>{message.text}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <HeaderBar whatScreen='feedchat'/>
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
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <FooterBar whatScreen='chat'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4d7ff',
  },
  messagesContainer: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  messageContainer: {
    backgroundColor: '#400096',
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
    backgroundColor: '#202112',
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
    backgroundColor: '#400096',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

