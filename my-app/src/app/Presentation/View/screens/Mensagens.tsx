import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import HeaderBar from '../../../Service/components/HeaderBar';
import FooterBar from '../../../Service/components/FooterBar';

interface Contact {
  id: number;
  name: string;
  status: string;
}

const contacts: Contact[] = [
  { id: 1, name: 'Mayke', status: 'Disponível' },
  { id: 2, name: 'Igor', status: 'Ocupado' },
  { id: 3, name: 'Luis', status: 'Offline' },
  { id: 4, name: 'Jhonas', status: 'Offline' },
  { id: 5, name: 'Joao', status: 'Offline' },
  { id: 6, name: 'Henry', status: 'Offline' },
  { id: 7, name: 'Jonathan', status: 'Offline' },
];

const ContactList: React.FC = () => {
  return (
    <>
    <HeaderBar whatScreen='feedchat'/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Mensagens</Text>
      {contacts.map((contact) => (
        <Link href={"./ChatApp"} asChild>
        <TouchableOpacity key={contact.id} style={styles.contactContainer}>
          <View style={styles.contact}>
            <Text style={styles.contactName}>
              <Ionicons name="person" size={24} color="#400096" style={{ marginRight: 10 }} />
              {contact.name}
            </Text>
            <Text style={styles.contactStatus}>{contact.status}</Text>
          </View>
        </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
    <FooterBar whatScreen='chat'/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#400096',
    marginBottom: 20,
  },
  contactContainer: {
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contact: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  contactName: {
    fontSize: 18,
    color: '#21212f',
  },
  contactStatus: {
    fontSize: 16,
    color: '#555',
  },
});

export default ContactList;
