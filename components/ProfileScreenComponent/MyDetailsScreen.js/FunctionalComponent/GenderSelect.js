import { View, Text } from "react-native";
import React from "react";

import CustomeGenderModal from "./CustomeGenderModal";
import CustomeItems from "../NonFuctionalComponent/CustomeItems";

import { useSelector } from "react-redux";

export default function GenderSelect() {
  const [genderModalVisible, setGenderNameModalVisible] = React.useState(false);
  const gender = useSelector((state) => state.user.gender);
  return (
    <View>
      <CustomeGenderModal
        genderModalVisible={genderModalVisible}
        setGenderNameModalVisible={setGenderNameModalVisible}
      />
      <CustomeItems
        title="Gender"
        details={gender}
        onPress={() => setGenderNameModalVisible(!genderModalVisible)}
      />
    </View>
  );
}
