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
import UserPersistence from "../../../Service/Persistence/UserPersistence";
import { router } from "expo-router";
import { set } from "zod";

const ChangeData = () => {
  const [profileData, setProfileData] = useState({
    displayName: "",
    nickname: "",
    email: "",
    course: "",
    shift: "",
    description: "",
  });
  const { user, GetUserInfo, CleanUpUserInfo } = UserScreenStateController();

  const { UpdateUserInfo } = ChangeDataStateController();
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const handleProfileChange = (name: any, value: any) => {
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(profileData);
  };

  const handleSubmit = async () => {
    setLoading(true);
    console.log("Dados do perfil atualizados:", profileData);
    const newUser = new User({
      displayName: profileData.displayName,
      nickname: profileData.nickname,
      email: profileData.email,
      course: profileData.course,
      shift: profileData.shift,
      description: profileData.description,
    });
    const updateInfo = await UpdateUserInfo(user, newUser);
    if (updateInfo.val === false) {
      setLoading(false);
      setErro(updateInfo.erro as string);
    } else if (updateInfo.val === true) {
      setModalContent(updateInfo.data);
      setLoading(false);
      setModalVisible(true);
    }
  };
  const handleCloseModal = () => {
    setModalVisible(false);
    setLoading(false);
  };

  useEffect(() => {
    const getInfo = async () => {
      const get = await GetUserInfo();
      if (get.val === false) {
        setLoading(false);

        setErro(get.erro as string);
      }
      if (user.name === "Não") {
        setLoading(false);

        setErro("Erro ao encontrar o usuário");
      } else {
        setLoading(false);
      }
    };
    getInfo();
    console.log(user);
    console.log(profileData);
    return () => {
      CleanUpUserInfo();
    };
  }, []);

  return (
    <>
      <ModalComponent
        Category={"Single Action"}
        isVisible={modalVisible}
        content={modalContent}
        onPress={handleCloseModal}
      />
      <View style={styles.container}>
        {loading ? (
          <>
            <LoadingBox whatPage="Comment" />
          </>
        ) : erro ? (
          <>
            <ErrorMessage message={erro} />
          </>
        ) : (
          <View style={styles.container}>
            <UserConfigProps
              optType="header"
              optText="Editar Perfil"
              optLink="./ContaConfig"
              optImgUrl={require("../../../../../assets/icons/icons8-esquerda-2-100.png")}
            />
            <View style={styles.formContainer}>
              <InputLabel
                label="Nome"
                holder={user.name}
                value={profileData.displayName}
                onChangeText={(text: any) =>
                  handleProfileChange("displayName", text)
                }
              />
              <InputLabel
                label="Sobrenome"
                holder={user.nickname}
                value={profileData.nickname}
                onChangeText={(text: any) =>
                  handleProfileChange("nickname", text)
                }
              />
              <InputLabel
                label="Email"
                holder={user.email}
                value={profileData.email}
                onChangeText={(text: any) => handleProfileChange("email", text)}
              />
              <InputLabel
                label="Curso"
                holder={user.course}
                value={profileData.course}
                onChangeText={(text: any) =>
                  handleProfileChange("course", text)
                }
              />
              <InputLabel
                label="Turno"
                holder={user.shift}
                value={profileData.shift}
                onChangeText={(text: any) => handleProfileChange("shift", text)}
              />
              <InputLabel
                label="Descrição"
                holder={user.description}
                value={profileData.description}
                onChangeText={(text: any) =>
                  handleProfileChange("description", text)
                }
              />
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
    backgroundColor: "#ffffff",
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
    borderColor: "#400096",
    borderRadius: 4,
    paddingLeft: 10,
    color: "#400096",
  },
  label: {
    color: "#400096",
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default ChangeData;
