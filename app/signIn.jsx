import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Ionicons } from "@expo/vector-icons"; // Import icons
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import { useAuth } from "../hooks/authContext";

export default function signIn() {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passRef = useRef("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passRef.current) {
      Alert.alert("Sign In", "Please fill all the fields!");
      return;
    }
    setLoading(true);
    const response = await login(emailRef.current, passRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign In", response.msg);
    }
    //login process
  };

  return (
    <>
      <View className="flex-1 justify-center items-center bg-white gap-6">
        <Image
          style={{
            height: hp(20),
            width: wp(50),
          }}
          source={require("../assets/images/login.png")}
        />
        <TextInput
          onChangeText={(value) => (emailRef.current = value.trim())}
          className="rounded-xl"
          style={{
            height: hp(8),
            width: wp(85),
            backgroundColor: "#FAF9F6",
            fontFamily: "OpenSans-Bold",
          }}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
        />
        <View style={styles.container}>
          {/* Text Input */}
          <TextInput
            onChangeText={(value) => (passRef.current = value.trim())}
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={hidePassword} // Toggle visibility
          />

          {/* Eye Icon */}
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setHidePassword(!hidePassword)} // Toggle password visibility
          >
            <Ionicons
              name={hidePassword ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>

        <View>
          {loading ? (
            <View>
              <Loading size={hp(12)} />
            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#121212",
                height: hp(8),
                width: wp(80),
                borderRadius: hp(1.5),
                justifyContent: "center", // Center vertically
                alignItems: "center", // Center horizontally
              }}
              onPress={handleLogin}
            >
              <Text
                style={{
                  fontFamily: "OpenSans-Bold",
                  color: "white",
                  fontSize: hp(2),
                  textAlign: "center",
                }}
              >
                Log In
              </Text>
            </TouchableOpacity>
          )}
        </View>

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
          onPress={() => console.log("Forgot Password button pressed")}
        >
          <Text
            className="font-bold"
            style={{
              fontFamily: "OpenSans-Bold",
              color: "#121212",
              fontSize: hp(1.5),
              textAlign: "center",
            }}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
        <View className="justify-center items-center gap-10 pt-20">
          <TouchableOpacity onPress={() => router.replace("signUp")}>
            <Text
              style={{
                fontFamily: "OpenSans-Bold",
                fontSize: hp(2),
                textAlign: "center",
              }}
            >
              New Member? Register!
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange input and icon horizontally
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    borderRadius: 10,
    width: "85%",
    height: 50,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1, // Takes up available space
    fontSize: 16,
    fontFamily: "OpenSans-Bold",
    color: "#252525",
  },
  icon: {
    padding: 5, // Add some padding for better touch area
  },
});
