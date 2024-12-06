import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Button({ title, handle }) {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: "#121212",
          height: hp(7),
          width: wp(70),
          borderRadius: hp(1.5),
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
        }}
        onPress={handle}
      >
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            color: "white",
            fontSize: hp(2),
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
