import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";

import Colors from "../../../../Constant/Colors";

export default function CustomeInput(props) {
  return (
    <View style={styles.container}>
      {props.cutomeInput ? (
        <View>
          {props.defaultValue ? (
            <View>
              <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
                <TextInput
                  style={[styles.textInput, { color: Colors.Secondary }]}
                  defaultValue={props.defaultValue}
                  onChangeText={props.setText}
                  editable={false}
                />
              </TouchableOpacity>
              {props.showError ? (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  * You have to fill up this
                </Text>
              ) : null}
            </View>
          ) : (
            <View>
              <TouchableOpacity activeOpacity={0.5} onPress={props.onPress}>
                <TextInput
                  style={[styles.textInput, { color: Colors.Secondary }]}
                  onChangeText={props.setText}
                  placeholder={props.placeholder}
                  editable={false}
                />
              </TouchableOpacity>
              {props.showError ? (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  * You have to fill up this
                </Text>
              ) : null}
            </View>
          )}
        </View>
      ) : (
        <View>
          {props.defaultValue ? (
            <View>
              <TextInput
                style={[styles.textInput, { color: Colors.Secondary }]}
                defaultValue={props.defaultValue}
                onChangeText={props.setText}
              />
              {props.showError ? (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  * You have to fill up this
                </Text>
              ) : null}
            </View>
          ) : (
            <View>
              <TextInput
                style={[styles.textInput, { color: Colors.Secondary }]}
                onChangeText={props.setText}
                placeholder={props.placeholder}
              />
              {props.showError ? (
                <Text style={{ color: "red", marginLeft: 5 }}>
                  * You have to fill up this
                </Text>
              ) : null}
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginVertical: "8@vs",
  },
  textInput: {
    borderBottomColor: Colors.TextGray,
    borderBottomWidth: 1,
    paddingVertical: 5,
    paddingLeft: 5,
  },
});
