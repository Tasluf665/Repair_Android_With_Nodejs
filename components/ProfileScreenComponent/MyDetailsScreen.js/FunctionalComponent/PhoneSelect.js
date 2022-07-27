import { View, Alert } from "react-native";
import React from "react";

import CustomeMobileModal from "./CustomeMobileModal";
import CustomeCodeModal from "./CustomeCodeModal";
import CustomeItems from "../NonFuctionalComponent/CustomeItems";

import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

export default function PhoneSelect() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [mobileModalVisible, setMobileModalVisible] = React.useState(false);
  const [codeModalVisible, setCodeModalVisible] = React.useState(false);

  const [verificationId, setVerificationId] = React.useState();
  const [mobileNumber, setMobileNumber] = React.useState();

  const mobile = useSelector((state) => state.user.mobile);
  return (
    <View>
      <CustomeMobileModal
        mobileModalVisible={mobileModalVisible}
        setMobileModalVisible={setMobileModalVisible}
        setCodeModalVisible={setCodeModalVisible}
        setVerificationId={setVerificationId}
        setMobileNumber={setMobileNumber}
        mobile={mobile}
      />
      <CustomeCodeModal
        codeModalVisible={codeModalVisible}
        setCodeModalVisible={setCodeModalVisible}
        verificationId={verificationId}
        mobileNumber={mobileNumber}
      />
      <CustomeItems
        title="Change Mobile"
        details={mobile}
        onPress={() =>
          user.providerData[0].providerId === "phone"
            ? Alert.alert("You can not change it")
            : setMobileModalVisible(!mobileModalVisible)
        }
      />
    </View>
  );
}
