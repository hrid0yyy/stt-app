import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Loading() {
  return (
    <View style={styles.overlay}>
      <View style={styles.loaderContainer}>
        <LottieView
          style={styles.loader}
          source={require("../assets/images/upload.json")}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    top: -hp(3),
    left: -wp(4),
    width: wp(100), // Full screen width
    height: hp(100), // Full screen height
    //  backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    width: wp(40), // Responsive size for the loader container
    height: wp(40), // Keeping it square
  },
  loader: {
    flex: 1,
  },
});
