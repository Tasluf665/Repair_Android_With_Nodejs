import React from "react";

import ModelTitle from "./ModelTitle";
import ModelText from "./ModelText";
import ModelInputBody from "./ModelInputBody";
import ModelContianer from "./ModelContianer";
import GenderModelItem from "./GenderModelItem";

export const NameModalView = (props) => {
  return (
    <ModelContianer>
      <>
        <ModelTitle
          title={props.title}
          setModalVisible={props.setModalVisible}
        />
        <ModelText title={props.title} />
        <ModelInputBody
          placeholder={props.placeholder}
          onPress={props.onPress}
        />
      </>
    </ModelContianer>
  );
};

export const GenderModalView = (props) => {
  return (
    <ModelContianer>
      <ModelTitle
        title="Gender"
        setModalVisible={props.setGenderNameModalVisible}
      />

      {["Male", "Female", "Other"].map((item) => {
        return (
          <GenderModelItem
            key={item}
            title={item}
            onPress={() => props.onPress(item)}
          />
        );
      })}
    </ModelContianer>
  );
};
