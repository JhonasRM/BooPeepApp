import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import UserConfigProps from "../components/UserConfig/UserConfigProps";

const ChangeData = () => {
    const [profileData, setProfileData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        course: "",
        shift: "",
    });

    const handleProfileChange = (name, value) => {
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        console.log("Dados do perfil atualizados:", profileData);
    };

    return (
        <View style={styles.container}>
            <UserConfigProps
                optType="header"
                optText="Editar Perfil"
                optLink="./ContaConfig"
                optImgUrl={require('../../../../../assets/icons/icons8-esquerda-2-100.png')}
            />
            <View style={styles.formContainer}>
                <Text style={styles.label}>Nome:</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Nome"
                        value={profileData.firstName}
                        onChangeText={(text) => handleProfileChange("firstName", text)}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Sobrenome:</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Sobrenome"
                        value={profileData.lastName}
                        onChangeText={(text) => handleProfileChange("lastName", text)}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Email:</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Email"
                        value={profileData.email}
                        onChangeText={(text) => handleProfileChange("email", text)}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Curso:</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Curso"
                        value={profileData.course}
                        onChangeText={(text) => handleProfileChange("course", text)}
                        style={styles.input}
                    />
                </View>
                <Text style={styles.label}>Turno:</Text>
                <View style={styles.inputGroup}>
                    <TextInput
                        placeholder="Turno"
                        value={profileData.shift}
                        onChangeText={(text) => handleProfileChange("shift", text)}
                        style={styles.input}
                    />
                </View>
                <Button title="Alterar" onPress={handleSubmit} color="#400096" style={styles.button} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        
    },
    formContainer: {
        flex: 1,
    },
    inputGroup: {
        marginBottom: 20,
        width: '100%',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#400096',
        borderRadius: 4,
        paddingLeft: 10,
        color: '#400096',
        width: '100%',
    },
    label: {
        color: '#400096',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});

export default ChangeData;
