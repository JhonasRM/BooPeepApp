import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import React, { useEffect, useState } from 'react';
import UserBlock from './UserBlock';
import { UserScreenStateController } from '../../../Controllers/UserScreenStateController';
import LoadingBox from '../LoadingIcon';
import ErrorMessage from '../ErrorMessage';
import MyCommentsBlock from './MyCommentsBlock';
import { AntDesign } from '@expo/vector-icons';


const UserProfileScreen: React.FC = () => {
  const {
    user,
    GetUserInfo,
    CleanUpUserInfo
  } = UserScreenStateController();
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(true)
  const [changeSection, setChangeSection] = useState(false);

  const handleChange = () => {
    setChangeSection(changeSection => !changeSection)
  }

  useEffect(() => {
    const getInfo = async() => {
      const get = await GetUserInfo();
      if(get.val === false){
        setErro(get.erro as string)
        setLoading(false)
      }
      if(user.name === "Não"){
        setLoading(true)
      }
      setLoading(false)
    }
    getInfo()
    return () => {
      CleanUpUserInfo()
    }
  }, [])
  return (
      <>
        <View style={styles.container}>
            { loading ? (
                <>
                    <LoadingBox whatPage="Feed" />
                </>
            ) : erro ? (
                <>
                    <ErrorMessage message={erro}/>
                </>
            ) : (
    <>
      <ScrollView style={styles.container}>
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
              <Text style={styles.username}>{user.name} {user.nickname}</Text>
              <Text style={styles.bio}>
                {user.description}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.additionalInfoContainer}>
          <Text style={styles.additionalInfoTitle}>Informações Adicionais</Text>
          <View style={styles.additionalInfoContent}>
            <Text style={styles.additionalInfo}>Email: {user.email}</Text>
            {/*<Text style={styles.additionalInfo}>Telefone: (11) 12345-6789</Text>*/}
            <Text style={styles.additionalInfo}>Curso: {user.course}</Text>
            <Text style={styles.additionalInfo}>Turno: {user.shift}</Text>
            {/* Adicione mais informações conforme necessário */}
          </View>
        </View>

        <View>
        <View style={styles.queryContainer}>
          { changeSection == false ? (
            <>
            <Text style={[styles.additionalInfoTitle, styles.additionalInfoContainer]}>Minhas postagens</Text>
            <TouchableOpacity style={styles.postsCommentsBtn} onPress={handleChange}>
              <AntDesign name="stepforward" size={30} color="black" />
            </TouchableOpacity>
            </>
          ) : (
            <>
            <Text style={[styles.additionalInfoTitle, styles.additionalInfoContainer]}>Meus comentários</Text>
            <TouchableOpacity style={styles.postsCommentsBtn} onPress={handleChange}>
              <AntDesign name="stepbackward" size={30} color="black" />
            </TouchableOpacity>
            </>
          )} 
          {/* <>
            <Text style={[styles.additionalInfoTitle, styles.additionalInfoContainer]}>Minhas postagens</Text>
          </> */}
        </View>
          { changeSection == false ? (
            <UserBlock />  
          ) : (
            <MyCommentsBlock />
          )} 
          {/* <UserBlock />   */}
      </View>
      </ScrollView>
    </>
    )}
    </View>
    </>
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
    marginTop: 10,
    marginHorizontal: 20,
    //paddingRight: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: 'white',
  },
  profileInfo: {
    padding: 20,
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
  userPostBlock: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  queryContainer: {
    flexDirection: 'row'
  },
  postsCommentsBtn: {
    position: 'absolute',
    right: 0,
    paddingRight: 20
  }
});

export default UserProfileScreen;
