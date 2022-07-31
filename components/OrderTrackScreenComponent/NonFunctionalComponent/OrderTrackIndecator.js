import React from "react";
import { View, Text } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import StepIndicator from "react-native-step-indicator";

import Colors from "../../../Constant/Colors";

import { OrderTrackCustomStyles } from "../../../Constant/OrderTrackItems";

const OrderTrackIndecator = (props) => {
  const trackData = props.trackData;
  const OrderTrackLabels = trackData.map((item) => item.statusState);
  return (
    <View style={styles.container}>
      <StepIndicator
        customStyles={OrderTrackCustomStyles}
        currentPosition={trackData.length}
        stepCount={trackData.length}
        direction="vertical"
        labels={OrderTrackLabels}
        renderLabel={({ position }) => {
          return (
            <View style={styles.lblContainer}>
              <Text style={styles.lblText}>
                {trackData[position].statusState}
              </Text>
              <Text style={styles.lblStatus}>
                {trackData[position].statusDetails}
              </Text>
              <Text style={styles.lblStatus}>
                {new Date(trackData[position].time)
                  .toUTCString()
                  .replace(" GMT", "")}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: "auto",
  },
  lblContainer: {
    marginTop: "38@vs",
    width: "250@s",
    marginLeft: "15@s",
  },
  lblText: {
    fontFamily: "RobotoSlabSemiBold",
    fontSize: "13@vs",
    marginBottom: "5@vs",
  },
  lblStatus: {
    fontFamily: "RobotoSlabRegular",
    color: Colors.IndicatorColor,
  },
});

export default OrderTrackIndecator;
