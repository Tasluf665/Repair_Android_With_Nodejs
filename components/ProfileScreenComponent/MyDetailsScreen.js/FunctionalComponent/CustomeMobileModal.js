import React, { useRef } from "react";
import { Modal, Alert } from "react-native";

import { NameModalView } from "../NonFuctionalComponent/Common";

import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import {
  firebaseApp,
  firebaseConfig,
} from "../../../../Constant/firebaseConfig";
import { getAuth, PhoneAuthProvider } from "firebase/auth";

export default function CustomeMobileModal(props) {
  const auth = getAuth(firebaseApp);

  const recaptchaVerifier = useRef(null);

  const handleSubmition = async (text) => {
    if (text && text.length === 14) {
      handelPhoneNumber(text);
      props.setMobileNumber(text);
      props.setMobileModalVisible((state) => !state);
    } else {
      Alert.alert("Invalide Number");
    }
  };

  async function handelPhoneNumber(text) {
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      props.setVerificationId("");
      const verificationId = await phoneProvider.verifyPhoneNumber(
        text,
        recaptchaVerifier.current
      );
      props.setVerificationId(verificationId);
      props.setCodeModalVisible((state) => !state);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.mobileModalVisible}
        onRequestClose={() => {
          props.setMobileModalVisible((state) => !state);
        }}
      >
        <NameModalView
          setModalVisible={props.setMobileModalVisible}
          placeholder={
            props.mobile === "Not Set" ? "Ex : +8801912345678" : props.mobile
          }
          title="Mobile"
          onPress={(text) => handleSubmition(text)}
        />
      </Modal>
    </>
  );
}
