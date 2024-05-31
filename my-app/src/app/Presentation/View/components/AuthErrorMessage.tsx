import React from "react";
import { useState } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";

type AuthErrorProps = {
  ErrorMessage: any,
  style?: StyleProp<ViewStyle>
}

const AuthErrorMessage = (props: AuthErrorProps) => {
  return (
    <>
    { props.ErrorMessage != "" ? (
    <View style={[styles.container, props.style]}>
      <Text style={styles.errorText}>{props.ErrorMessage}</Text>
    </View>
    ) : (
      <>
      </>
    )
    }
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ff000080",
    borderRadius: 4,
    paddingVertical: 5,
    marginBottom: 5,

  },
  errorText: {
    textAlign: "center",
    fontSize: 15,
    color: "#FFF"
  }
})

export default AuthErrorMessage