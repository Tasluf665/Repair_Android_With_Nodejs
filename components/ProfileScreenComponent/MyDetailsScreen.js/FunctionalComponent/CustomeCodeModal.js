import React from "react";
import { Modal, Alert } from "react-native";

import { NameModalView } from "../NonFuctionalComponent/Common";

import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../../store/actions/user";

import { firebaseApp } from "../../../../Constant/firebaseConfig";
import { getAuth, PhoneAuthProvider, updatePhoneNumber } from "firebase/auth";

export default function CustomeCodeModal(props) {
  const auth = getAuth(firebaseApp);
  const user = auth.currentUser;
  const dispatch = useDispatch();

  const handleSubmition = (text) => {
    if (text && text.length === 6) {
      handelVerificationCode(text);
      props.setCodeModalVisible((state) => !state);
    } else {
      Alert.alert("Invalide Number");
    }
  };

  async function handelVerificationCode(text) {
    try {
      const credential = PhoneAuthProvider.credential(
        props.verificationId,
        text
      );

      await updatePhoneNumber(user, credential);

      await dispatch(
        updateUserDetails({ name: "mobile", value: props.mobileNumber })
      );
    } catch (err) {
      if (err.code == "auth/account-exists-with-different-credential") {
        Alert.alert("This phone number is used in different account");
      } else if (err.code == "auth/invalid-verification-code") {
        Alert.alert("You enter Invalide code");
      } else {
        console.log(err.message);
      }
    }
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.codeModalVisible}
      onRequestClose={() => {
        props.setCodeModalVisible((state) => !state);
      }}
    >
      <NameModalView
        setModalVisible={props.setCodeModalVisible}
        placeholder="- - - - - -"
        title="Code"
        onPress={(text) => handleSubmition(text)}
      />
    </Modal>
  );
}
