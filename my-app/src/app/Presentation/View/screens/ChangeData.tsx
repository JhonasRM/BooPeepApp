import { useEffect, useState } from "react";
import React = require("react");
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import UserConfigProps from "../components/UserConfig/UserConfigProps";
import { UserScreenStateController } from "../../Controllers/UserScreenStateController";
import LoadingBox from "../components/LoadingIcon";
import ErrorMessage from "../components/ErrorMessage";
import { ChangeDataStateController } from "../../Controllers/ChangeDataStateController";
import { User } from "../../../Service/Entities/userEntities";
import ModalComponent from "../components/ModalComponent";

const ChangeData = () => {
    const [profileData, setProfileData] = useState<User>(new User({}));
    const {
        user,
        GetUserInfo,
        CleanUpUserInfo
      } = UserScreenStateController();
     
    const {
        UpdateUserInfo
    } = ChangeDataStateController()
    const [erro, setErro] = useState('')
    const [loading, setLoading] = useState(false)
    const [modalVisible,  setModalVisible] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const handleProfileChange = (name: any, value: any) => {
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        setLoading(true)
        console.log("Dados do perfil atualizados:", profileData);
        const updateInfo = await UpdateUserInfo(user, profileData)
        if(updateInfo.val === false){
            setLoading(false)
            setErro(updateInfo.erro as string)
        }
        setModalContent(updateInfo.data)
        setLoading(false)
        setModalVisible(true)
        
    };
    const handleCloseModal = () =>{
        setModalVisible(false)
    }
    
    useEffect(() => {
        setLoading(true)
        const getInfo = async() => {
          const get = await GetUserInfo();
          if(get.val=== false){
            setErro(get.erro as string)
            setLoading(false)
          }
          setLoading(false)
        }
        getInfo()
        console.log(user)
        return () => {
          CleanUpUserInfo()
        }
      }, [])

    return (
        <>
        <ModalComponent isVisible= {modalVisible} content={modalContent} onClose={handleCloseModal}/>
        <View style={styles.container}>
            { loading ? (
                <>
                    <LoadingBox whatPage="Comment" />
                </>
            ) : erro ? (
                <>
                    <ErrorMessage message={erro}/>
                </>
            ) : (
        <View style={styles.container}>
            <UserConfigProps
                optType="header"
                optText="Editar Perfil"
                optLink="./ContaConfig"
                optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
            />
            <View style={styles.formContainer}>
                <InputLabel label="Nome" holder={user.name} value={profileData.name} onChangeText={(text: any) => handleProfileChange("firstName", text)} />
                <InputLabel label="Sobrenome" value={profileData.nickname} onChangeText={(text: any) => handleProfileChange("lastName", text)} />
                <InputLabel label="Email" holder={user.email} value={profileData.email} onChangeText={(text: any) => handleProfileChange("email", text)} />
                <InputLabel label="Curso" value={profileData.course} onChangeText={(text: any) => handleProfileChange("course", text)} />
                <InputLabel label="Turno"value={profileData.shift} onChangeText={(text: any) => handleProfileChange("shift", text)} />
                <Button title="Alterar" onPress={handleSubmit} color="#400096" />
            </View>
        </View>
         )}
         </View>
         </>
    );
};

const InputLabel = ({ label, holder, value, onChangeText }: any) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
            placeholder={holder}
            value={value}
            onChangeText={onChangeText}
            style={styles.input}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    formContainer: {
        flex: 1,
        padding: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#400096',
        borderRadius: 4,
        paddingLeft: 10,
        color: '#400096',
    },
    label: {
        color: '#400096',
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default ChangeData;
