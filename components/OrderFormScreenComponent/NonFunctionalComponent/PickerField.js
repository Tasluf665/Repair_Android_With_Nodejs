import { View, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { ScaledSheet } from "react-native-size-matters";
import setting from "../../../Constant/setting";

import Colors from "../../../Constant/Colors";
import CustomeFonts from "../../../Constant/CustomeFonts";
import { useSelector, useDispatch } from "react-redux";
import { authRefreshToken } from "../../../store/actions/auth";

export default function PickerField(props) {
  const [models, setModels] = React.useState([]);
  const token = useSelector((state) => state.auth.token);
  const refresh_token = useSelector((state) => state.auth.refresh_token);
  const dispatch = useDispatch();

  const handleProductChange = async (brandId) => {
    try {
      const response = await fetch(
        `${setting.apiUrl}/api/products/models/${props.productId}/${brandId}`,
        {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const result = await response.json();

      if (!result.error) {
        setModels(result.data);
      } else {
        dispatch(authRefreshToken(refresh_token));
      }
    } catch (ex) {
      console.log(
        "🚀 ~ file: PickerField.js ~ line 19 ~ handleProductChange ~ ex",
        ex
      );
    }
  };
  return (
    <View style={styles.rowContainer}>
      <View style={styles.date}>
        <View style={styles.container}>
          <Text style={styles.text}>Brand</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={props.values.brand}
              onValueChange={(itemValue, itemIndex) => {
                handleProductChange(itemValue);

                props.setFieldValue("brand", itemValue);
              }}
            >
              <Picker.Item label="Select" value="" enabled={false} />
              {props.brands.map((item) => (
                <Picker.Item
                  label={item.brandName}
                  value={item._id}
                  key={item._id}
                />
              ))}
            </Picker>
          </View>
          {props.errors.brand && props.touched.brand ? (
            <Text style={styles.errorText}>{props.errors.brand}</Text>
          ) : null}
        </View>
      </View>
      <View style={styles.date}>
        <View style={styles.container}>
          <Text style={styles.text}>Model</Text>
          <View style={styles.pickerStyle}>
            <Picker
              selectedValue={props.values.model}
              onValueChange={(itemValue, itemIndex) => {
                props.setFieldValue("model", itemValue);
              }}
              enabled={models.length > 0}
            >
              <Picker.Item label="Select" value="" enabled={false} />
              {models.map((item) => (
                <Picker.Item
                  label={item.modelName}
                  value={item._id}
                  key={item._id}
                />
              ))}
            </Picker>
          </View>
          {props.errors.model && props.touched.model ? (
            <Text style={styles.errorText}>{props.errors.model}</Text>
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
