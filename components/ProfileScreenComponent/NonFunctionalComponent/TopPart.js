import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableNativeFeedback } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";
import { useSelector } from "react-redux";

import Colors from "../../../Constant/Colors";

const TopPart = (props) => {
  const [imageUri, setImageUri] = useState();
  const userId = useSelector((state) => state.auth.userId);

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

      if (res.includes(`${userId}.jpeg`)) {
        setImageUri(FileSystem.documentDirectory + `${userId}.jpeg`);
      }
    };
    getData();
    return () => {
      // setImageUri(FileSystem.documentDirectory + `${userId}.jpeg`);
    };
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();

      const manipResult = await manipulateAsync(
        result.localUri || result.uri,
        [],
        { compress: 1, format: SaveFormat.JPEG }
      );

      if (!manipResult.cancelled) {
        const newPath = FileSystem.documentDirectory + `${userId}.jpeg`;

        await FileSystem.copyAsync({
          from: manipResult.uri,
          to: newPath,
        });

        setImageUri(manipResult.uri);
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
