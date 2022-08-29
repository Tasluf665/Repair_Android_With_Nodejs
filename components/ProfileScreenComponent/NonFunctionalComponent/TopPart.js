import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import Colors from "../../../Constant/Colors";

const TopPart = (props) => {
  const [imageUri, setImageUri] = useState();

  const requestPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync();

    if (!result.granted) {
      alert("You need to enable permission to add profile picture");
    }
  };
  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const res = await FileSystem.readDirectoryAsync(
        FileSystem.documentDirectory
      );

      if (res.includes("myimg.jpg")) {
        setImageUri(FileSystem.documentDirectory + "myimg.jpg");
      }
    };
    getData();
    return () => {
      setImageUri(FileSystem.documentDirectory + "myimg.jpg");
    };
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        const newPath = FileSystem.documentDirectory + "myimg.jpg";

        await FileSystem.copyAsync({
          from: result.uri,
          to: newPath,
        });

        setImageUri(result.uri);
      }
    } catch (error) {
      console.log(
        "🚀 ~ file: TopPart.js ~ line 24 ~ selectImage ~ error",
        error
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={selectImage}>
        <Image
          style={styles.image}
          source={
            imageUri
              ? { uri: imageUri }
              : require("../../../assets/Images/profile-icon.jpg")
          }
        />
      </TouchableNativeFeedback>

      <Text style={styles.text}>{props.name}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    alignItems: "center",
    marginTop: "50@vs",
  },
  image: {
    width: "100@vs",
    height: "100@vs",
    borderRadius: "50@vs",
    marginBottom: "10@vs",
  },
  text: {
    fontFamily: "RobotoSlabRegular",
    marginTop: "10@vs",
    color: Colors.Secondary,
    fontSize: "14@s",
  },
});

export default TopPart;
