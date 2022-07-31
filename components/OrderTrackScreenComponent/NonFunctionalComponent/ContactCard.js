import React from "react";
import { View, Text, Image, Button } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../Constant/Colors";
import * as Linking from "expo-linking";

const ContactCard = ({ technician }) => {
  const handelPhone = () => {
    Linking.openURL(`tel:${technician.phone}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.title}>Technician Details</Text>
          <Text style={styles.details}>
            Name: {technician ? technician.name : null}
          </Text>
          <Text style={styles.details}>
            Phone: {technician ? technician.phone : null}
          </Text>
        </View>
        {/* <View style={styles.right}>
          <Image
            source={require("../../../assets/Images/tilok.jpg")}
            style={styles.image}
          />
          <Text style={styles.details}>ID: </Text>
        </View> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Call Now"
          color={Colors.Secondary}
          onPress={handelPhone}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    elevation: 3,
    marginTop: "30@vs",
    borderRadius: 40,
  },
  rowContainer: {
    flexDirection: "row",
    margin: "25@vs",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  left: {
    justifyContent: "space-between",
    width: "70%",
  },
  right: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "30%",
  },
  image: {
    width: "60@vs",
    height: "60@vs",
    borderRadius: "30@vs",
    marginBottom: "5@vs",
  },
  title: {
    fontFamily: "RobotoSlabSemiBold",
  },
  details: {
    fontFamily: "RobotoSlabRegular",
  },
  buttonContainer: {
    width: "40%",
    alignSelf: "center",
    marginBottom: "15@vs",
  },
});

export default ContactCard;
