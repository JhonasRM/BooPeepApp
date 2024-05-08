import { useState } from "react";
import React = require("react");
import { Button, StyleSheet, Text, TextInput, View } from "react-native"
import UserConfigProps from "../components/UserConfig/UserConfigProps"

const ChangePassword = () => {
    const [profileData, setProfileData] = useState({
        password: "",
        Confirmpassword: "",
    });

    const handleProfileChange = (name: any, value: any) => {
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log("Dados do perfil atualizados:", profileData);
    };
    
    return (
        <>
        <View style={styles.container}>
            <UserConfigProps optType="header" optText="Senha" optLink="./ContaConfig"
            optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}/>

            <View style={styles.formContainer}>
                <InputLabel label="Senha" value={profileData.password} onChangeText={(text: any) => handleProfileChange("password", text)} />
                <InputLabel label="Confirmar Senha" value={profileData.Confirmpassword} onChangeText={(text: any) => handleProfileChange("Confirmpassword", text)} />
                <Button title="Alterar" onPress={handleSubmit} color="#400096" />
            </View>
        </View>
        </>
    )
}

const InputLabel = ({ label, value, onChangeText }: any) => (
    <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}:</Text>
        <TextInput
            placeholder={label}
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

export default ChangePassword