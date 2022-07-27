import React from "react";
import { Modal, Alert } from "react-native";

import { NameModalView } from "../NonFuctionalComponent/Common";

import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../../store/actions/user";

import { firebaseApp } from "../../../../Constant/firebaseConfig";
import { getAuth, updateEmail } from "firebase/auth";

export default function CustomeEmailModal(props) {
  const auth = getAuth(firebaseApp);

  const dispatch = useDispatch();

  const handleSubmition = async (text) => {
    try {
      await updateEmail(auth.currentUser, text);
      await dispatch(updateUserDetails({ name: "email", value: text }));
      props.setEmailModalVisible((state) => !state);
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        Alert.alert("You have to log in into your account again");
      } else if (err.code === "auth/email-already-in-use") {
        Alert.alert("This email already used");
      } else {
        console.log(err.message);
      }
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.emailModalVisible}
      onRequestClose={() => {
        props.setEmailModalVisible((state) => !state);
      }}
    >
      <NameModalView
        setModalVisible={props.setEmailModalVisible}
        placeholder={props.email}
        title="Email"
        onPress={(text) => handleSubmition(text)}
      />
    </Modal>
  );
}
