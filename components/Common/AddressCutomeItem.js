import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import { Entypo } from "@expo/vector-icons";
import Colors from "../../Constant/Colors";
import CustomeFonts from "../../Constant/CustomeFonts";

export default function AddressCutomeItem({
  item,
  defaultAddress,
  navigation,
}) {
  return (
    <View style={styles.addressContainer}>
      <View style={styles.line}></View>
      <View style={{ flexDirection: "row" }}>
        <Entypo name="location-pin" size={24} color={Colors.Primary} />
        <View style={styles.addressDetailsContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.text}>{item.phone}</Text>
          <Text
            style={styles.text}
          >{`${item.address}, ${item.area}, ${item.city}, ${item.region} `}</Text>
          <View style={{ flexDirection: "row" }}>
            <Text style={[styles.text, { color: Colors.Primary }]}>
              {item.office ? "Office" : "Home"}
            </Text>

            {defaultAddress === item._id ? (
              <Text style={[styles.text, styles.defaultText]}>Default</Text>
            ) : null}
          </View>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate("AddNewAddressScreen", {
                EditItem: item,
              })
            }
          >
            <Text style={[styles.title, styles.editText]}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  addressContainer: {
    paddingHorizontal: "17@s",
  },
  addressDetailsContainer: {
    marginLeft: "5@s",
    width: "80%",
  },
  line: {
    backgroundColor: Colors.LineColor,
    height: 1,
    marginVertical: "20@vs",
  },
  title: {
    fontFamily: CustomeFonts.RobotoSlabBold,
    marginBottom: "12@vs",
  },
  text: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    marginBottom: "5@vs",
  },
  defaultText: {
    color: Colors.Primary,
    marginLeft: "15@s",
  },
  editText: {
    color: Colors.Primary,
    height: "30@vs",
  },
});
