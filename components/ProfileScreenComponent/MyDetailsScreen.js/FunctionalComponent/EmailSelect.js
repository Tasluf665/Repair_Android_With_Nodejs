import { View, Alert } from "react-native";
import React from "react";

import CustomeEmailModal from "./CustomeEmailModal";
import CustomeItems from "../NonFuctionalComponent/CustomeItems";

import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";

export default function EmailSelect() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [emailModalVisible, setEmailModalVisible] = React.useState(false);
  const email = useSelector((state) => state.user.email);
  return (
    <View>
      <CustomeEmailModal
        emailModalVisible={emailModalVisible}
        setEmailModalVisible={setEmailModalVisible}
        email={email}
      />
      <CustomeItems
        title="Change Email"
        details={email}
        onPress={() =>
          user.providerData[0].providerId === "google.com"
            ? Alert.alert("You can not change it")
            : setEmailModalVisible(!emailModalVisible)
        }
      />
    </View>
  );
}
