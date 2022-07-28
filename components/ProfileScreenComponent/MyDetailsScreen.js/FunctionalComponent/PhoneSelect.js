import { View, Alert } from "react-native";
import React from "react";

import CustomePhoneModal from "./CustomePhoneModal";
import CustomeItems from "../NonFuctionalComponent/CustomeItems";

import { useSelector } from "react-redux";

export default function PhoneSelect() {
  const [phoneModalVisible, setPhoneModalVisible] = React.useState(false);
  const userPhone = useSelector((state) => state.user.phone);
  return (
    <View>
      <CustomePhoneModal
        phoneModalVisible={phoneModalVisible}
        setPhoneModalVisible={setPhoneModalVisible}
        phone={userPhone}
      />
      <CustomeItems
        title="Change Phone"
        details={userPhone}
        onPress={() => {
          setPhoneModalVisible(!phoneModalVisible);
        }}
      />
    </View>
  );
}
