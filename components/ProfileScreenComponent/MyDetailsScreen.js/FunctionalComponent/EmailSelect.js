import { View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";

import CustomeItems from "../NonFuctionalComponent/CustomeItems";

export default function EmailSelect() {
  const email = useSelector((state) => state.user.email);
  return (
    <View>
      <CustomeItems title="Email" details={email} />
    </View>
  );
}
