import { View } from "react-native";
import React from "react";

import CustomeNameModal from "./CustomeNameModal";
import CustomeItems from "../NonFuctionalComponent/CustomeItems";

import { useSelector } from "react-redux";

export default function NameSelect() {
  const [nameModalVisible, setNameModalVisible] = React.useState(false);
  const name = useSelector((state) => state.user.name);
  return (
    <View>
      <CustomeNameModal
        nameModalVisible={nameModalVisible}
        setNameModalVisible={setNameModalVisible}
        name={name}
      />
      <CustomeItems
        title="Name"
        details={name}
        onPress={() => setNameModalVisible(!nameModalVisible)}
      />
    </View>
  );
}
