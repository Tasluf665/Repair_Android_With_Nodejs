import React from "react";
import { View, StyleSheet, StatusBar } from "react-native";

import Colors from "../../../Constant/Colors";

import CustomeItems from "./NonFuctionalComponent/CustomeItems";

import BirthDayPicker from "./FunctionalComponent/BirthDayPicker";
import NameSelect from "./FunctionalComponent/NameSelect";
import EmailSelect from "./FunctionalComponent/EmailSelect";
import GenderSelect from "./FunctionalComponent/GenderSelect";
import PhoneSelect from "./FunctionalComponent/PhoneSelect";

export default function MyDetailsMainScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.Primary_Helper} />
      <View style={{ marginBottom: 15 }}>
        <NameSelect />
        <CustomeItems
          title="Change Password"
          onPress={() => props.navigation.navigate("SetPassword")}
        />
      </View>
      <PhoneSelect />
      <EmailSelect />
      <GenderSelect />
      <BirthDayPicker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 20,
  },
});
