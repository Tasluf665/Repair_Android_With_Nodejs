import React from "react";
import { Modal } from "react-native";

import { GenderModalView } from "../NonFuctionalComponent/Common";

import { useDispatch } from "react-redux";
import { updateUserDetails } from "../../../../store/actions/user";

export default function CustomeGenderModal(props) {
  const dispatch = useDispatch();

  const handleSubmition = async (text) => {
    await dispatch(updateUserDetails({ name: "gender", value: text }));
    props.setGenderNameModalVisible((state) => !state);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.genderModalVisible}
      onRequestClose={() => {
        props.setGenderNameModalVisible(!props.genderModalVisible);
      }}
    >
      <GenderModalView
        setGenderNameModalVisible={props.setGenderNameModalVisible}
        onPress={(item) => {
          handleSubmition(item);
        }}
      />
    </Modal>
  );
}
