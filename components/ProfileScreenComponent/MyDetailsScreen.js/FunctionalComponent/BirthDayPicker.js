import { View, Text } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import { useSelector, useDispatch } from "react-redux";
import { updateUserDetails } from "../../../../store/actions/user";

import CustomeItems from "../NonFuctionalComponent/CustomeItems";

export default function BirthDayPicker(props) {
  const dispatch = useDispatch();
  const birthday = useSelector((state) => state.user.birthday);

  const [birthdayDate, setBirthdayDate] = React.useState(birthday);
  const [show, setShow] = React.useState(false);
  const [date, setDate] = React.useState(new Date());

  const onChange = async (event, selectedDate) => {
    if (selectedDate) {
      let onlyDate =
        selectedDate.getDate() +
        "-" +
        (selectedDate.getMonth() + 1) +
        "-" +
        selectedDate.getFullYear();
      setShow(false);
      setBirthdayDate(onlyDate);

      setDate(selectedDate);

      dispatch(updateUserDetails({ name: "birthday", value: onlyDate }));
    } else {
      setShow(false);
    }
  };
  return (
    <View>
      <CustomeItems
        title="Birthday"
        details={birthdayDate}
        onPress={() => setShow(true)}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
