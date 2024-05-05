import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserProfileScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.editProfileButton}>
          <Text style={styles.editProfileButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.configButton}>
          <Icon name="cog" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <View style={styles.userIconContainer}>
              <Icon name="user" size={100} color="#FFF" />
            </View>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>Igor Rocha</Text>
            <Text style={styles.bio}>
              Desenvolvedor de software apaixonado por tecnologia.
            </Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Seguir</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.additionalInfoContainer}>
        <Text style={styles.additionalInfoTitle}>Informações Adicionais</Text>
        <View style={styles.additionalInfoContent}>
          <Text style={styles.additionalInfo}>Email: igorrocha@gamil.com</Text>
          <Text style={styles.additionalInfo}>Telefone: (11) 12345-6789</Text>
          {/* Adicione mais informações conforme necessário */}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  editProfileButton: {
    backgroundColor: '#400096',
    padding: 10,
    borderRadius: 50,
  },
  editProfileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  configButton: {
    padding: 10,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  profileInfo: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginRight: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 50,
  },
  userInfoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bio: {
    fontSize: 16,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#400096',
    padding: 10,
    borderRadius: 50,
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  additionalInfoContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  additionalInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  additionalInfoContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 20,
  },
  additionalInfo: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10,
  },
});

export default UserProfileScreen;
