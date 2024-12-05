import "react-native-gesture-handler";
import { View, Text, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
export default function Index() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Show the splash screen for 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  if (loading) {
    // Render the splash screen
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <Loading size={hp(7)} />
        <Image
          style={{ marginTop: -hp(4) }}
          source={require("../assets/images/splash.png")}
        />
      </View>
    );
  }

  // Render the main screen after loading is complete
  return (
    <>
      <Image
        style={{
          height: "100%",
          width: "100%",
          marginTop: -hp(35),
        }}
        source={require("../assets/images/welcomeImg.png")}
      />
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "OpenSans-Bold",
            color: "#252525",
            fontSize: hp(1.6),
            textAlign: "center",
            marginTop: hp(3),
          }}
        >
          Read more and stress less with our online book shopping app. Shop from
          anywhere you are and discover titles that you love. Happy reading!
        </Text>
      </View>

      <View className="flex-1 justify-center items-center bg-gray-100 gap-1">
        <TouchableOpacity
          style={{
            backgroundColor: "#121212",
            height: hp(8),
            width: wp(80),
            borderRadius: hp(1.5),
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
          }}
          onPress={() => router.push("signUp")}
        >
          <Text
            style={{
              fontFamily: "OpenSans-Bold",
              color: "white",
              fontSize: hp(2),
              textAlign: "center",
            }}
          >
            Get Started
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: hp(5.5),
            width: wp(40),
            borderRadius: hp(1.5),
            justifyContent: "center", // Center vertically
            alignItems: "center", // Center horizontally
            backgroundColor: "transparent", // Add background if needed
            borderColor: "#121212",
          }}
          onPress={() => router.push("signIn")}
        >
          <Text
            style={{
              fontFamily: "OpenSans-Bold",
              color: "#121212",
              fontSize: hp(2),
              textAlign: "center",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
