import { View, Text, StyleSheet, FlatList, StatusBar } from "react-native";
import React from "react";

import Colors from "../../../../Constant/Colors";
import CustomeFonts from "../../../../Constant/CustomeFonts";
import TopBar from "../../../Common/TopBar";

export default function CommonAddressScreen(props) {
  return (
    <View style={styles.modalContainer}>
      <TopBar navigation={props.navigation} name={props.name} />
      <FlatList
        keyExtractor={(item) => item.displayName}
        data={props.getData}
        renderItem={props.renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.Gray,
  },
  topBar: {
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: "white",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    marginBottom: 10,
  },
  text: {
    fontFamily: CustomeFonts.LatoRegular,
    fontSize: 15,
    marginLeft: 15,
  },
});
