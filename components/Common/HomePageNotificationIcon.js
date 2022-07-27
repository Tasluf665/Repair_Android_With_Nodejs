import { View, Text } from "react-native";
import React from "react";

import IconBadge from "react-native-icon-badge";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../Constant/Colors";
import { useNavigation } from "@react-navigation/native";

export default function HomePageNotificationIcon(props) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconBadge
        MainElement={
          <Ionicons
            name="notifications"
            size={24}
            color={Colors.Primary_Helper}
            onPress={() => navigation.navigate("NotificationStack")}
            style={{ marginTop: props.notificationCount == 0 ? 0 : 5 }}
          />
        }
        BadgeElement={
          <Text style={{ color: Colors.Primary_Helper }}>
            {props.notificationCount}
          </Text>
        }
        IconBadgeStyle={{
          width: 10,
          height: 20,
          left: 15,
        }}
        Hidden={props.notificationCount == 0}
      />
    </View>
  );
}
