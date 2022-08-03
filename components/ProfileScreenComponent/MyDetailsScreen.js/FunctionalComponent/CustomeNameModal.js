import React from "react";
import { Modal } from "react-native";

import { useDispatch } from "react-redux";

import { NameModalView } from "../NonFuctionalComponent/Common";
import { updateUserDetails } from "../../../../store/actions/user";

export default function CustomeNameModal(props) {
  const dispatch = useDispatch();

  const handleSubmition = async (text) => {
    if (text) {
      await dispatch(updateUserDetails({ name: "name", value: text }));
      props.setNameModalVisible((state) => !state);
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.nameModalVisible}
      onRequestClose={() => {
        props.setNameModalVisible((state) => !state);
      }}
    >
      <NameModalView
        setModalVisible={props.setNameModalVisible}
        placeholder={props.name}
        title="Name"
        onPress={handleSubmition}
      />
    </Modal>
  );
}
