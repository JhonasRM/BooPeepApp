import React from "react";
import { Modal, StyleSheet, Text, View, Pressable } from "react-native";

interface ModalProps {
  Category: "Single Action" | "Dual Action";
  isVisible: boolean;
  content: string;
  onPress: () => void;
  optionalonPress?: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  Category,
  isVisible,
  content,
  onPress,
  optionalonPress,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onPress}
    >
      <View style={styles.centeredView}>
        {Category === "Single Action" && (
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{content}</Text>
            <Pressable
              style={[styles.button, styles.buttonPress]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>OK</Text>
            </Pressable>
          </View>
        )}
        {Category === "Dual Action" && (
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{content}</Text>
            <Pressable
              style={[styles.button, styles.buttonPress]}
              onPress={onPress}
            >
              <Text style={styles.textStyle}>Confirmar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonPress]}
              onPress={optionalonPress}
            >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonPress: {
    backgroundColor: "#7b83ff",
  },
  buttonOptional: {
    backgroundColor: "#2196F3", // cor diferente para o botão opcional
    marginTop: 10, // margem superior para separar os botões
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default ModalComponent;
