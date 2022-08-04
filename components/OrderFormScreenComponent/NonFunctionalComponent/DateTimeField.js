import { View, Text, TextInput, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import DateTimePicker from "@react-native-community/datetimepicker";

import { MaterialIcons } from "@expo/vector-icons";
import CustomeFonts from "../../../Constant/CustomeFonts";
import Colors from "../../../Constant/Colors";

export default function DateTimeField(props) {
  const [showDate, setShowDate] = React.useState(false);
  const [showTime, setShowTime] = React.useState(false);

  const onChangeDate = async (event, selectedDate) => {
    if (selectedDate) {
      setShowDate(false);
      props.setFieldValue("arrivalDate", selectedDate.toISOString());
    } else {
      setShowDate(false);
    }
  };

  const onChangeTime = async (event, selectedTime) => {
    if (selectedTime) {
      setShowTime(false);
      props.setFieldValue("arrivalTime", selectedTime.toISOString());
    } else {
      setShowTime(false);
    }
  };
  return (
    <View style={styles.rowContainer}>
      <View style={styles.date}>
        <View style={styles.container}>
          <Text style={styles.text}>Date</Text>
          <TouchableWithoutFeedback onPress={() => setShowDate(true)}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={props.keyboardType}
                value={
                  props.values.arrivalDate
                    ? new Date(props.values.arrivalDate).toLocaleDateString()
                    : ""
                }
                editable={false}
              />
              {showDate && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={"date"}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeDate}
                />
              )}
              <MaterialIcons name="date-range" size={24} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {props.errors.date && props.touched.date ? (
          <Text style={styles.errorText}>{props.errors.date}</Text>
        ) : null}
      </View>
      <View style={styles.date}>
        <View style={styles.container}>
          <Text style={styles.text}>Time</Text>
          <TouchableWithoutFeedback onPress={() => setShowTime(true)}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType={props.keyboardType}
                value={
                  props.values.arrivalTime
                    ? new Date(props.values.arrivalTime).toLocaleTimeString()
                    : ""
                }
                editable={false}
              />
              {showTime && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={"time"}
                  is24Hour={false}
                  display="default"
                  onChange={onChangeTime}
                />
              )}
              <MaterialIcons name="access-time" size={24} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {props.errors.time && props.touched.time ? (
          <Text style={styles.errorText}>{props.errors.time}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
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

  container: {
    marginTop: "18@vs",
  },
  text: {
    fontFamily: "RobotoSlabSemiBold",
    color: Colors.Secondary,
    marginBottom: "10@vs",
  },
  textInput: {
    padding: "8@vs",
    paddingHorizontal: "12@s",
    width: "80%",
    color: Colors.Secondary,
  },
  textInputContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.InputBorderColor,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
});
