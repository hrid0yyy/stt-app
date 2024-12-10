import React from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CategoryCard({ title }) {
  return (
    <View
      style={{
        borderRadius: hp(2),
        height: hp(18),
        width: wp(40),
        overflow: "hidden",
      }}
    >
      <ImageBackground
        source={require("../assets/images/1001222766.jpg")}
        style={{
          height: "100%",
          width: "100%",
        }}
        imageStyle={{
          borderRadius: hp(2),
        }}
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.1)"]} // Darker at the top, lighter at the bottom
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: hp(2),
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}
