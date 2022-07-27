import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";
import CustomeFonts from "../../../Constant/CustomeFonts";

export default function PickerField(props) {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.date}>
        <View style={styles.container}>
          <Text style={styles.text}>Product</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={props.values.product}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue("product", itemValue);
              }}
            >
              <Picker.Item label="Select" value="" enabled={false} />
              <Picker.Item label="Samsung" value="Samsung" />
              <Picker.Item label="Xiaomi" value="Xiaomi" />
            </Picker>
          </View>
          {props.errors.product && props.touched.product ? (
            <Text style={styles.errorText}>{props.errors.product}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.date}>
        <View style={styles.container}>
          <Text style={styles.text}>Type</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={props.values.type}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue("type", itemValue);
              }}
            >
              <Picker.Item label="Select" value="" enabled={false} />
              <Picker.Item label="LG" value="LG" />
              <Picker.Item label="Walton" value="Walton" />
            </Picker>
          </View>
          {props.errors.type && props.touched.type ? (
            <Text style={styles.errorText}>{props.errors.type}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginTop: "18@vs",
  },
  text: {
    fontFamily: "RobotoSlabSemiBold",
    color: Colors.Secondary,
    marginBottom: "10@vs",
  },
  pickerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.InputBorderColor,
    paddingLeft: "8@s",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    width: "45%",
  },
  errorText: {
    fontFamily: CustomeFonts.RobotoSlabRegular,
    color: Colors.Red,
    marginTop: 2,
    marginLeft: 5,
  },
});
