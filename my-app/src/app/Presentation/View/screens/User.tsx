import React from "react"
import FooterBar from "../components/FooterBar"
import HeaderBar from "../components/HeaderBar"
import UserProfileScreen from "../components/User/UserScreen"

const Users = () => {
  return (
    <>
      <HeaderBar whatScreen='user' />
      <UserProfileScreen />
      <FooterBar whatScreen='user' />
    </>
  )
}

export default Users