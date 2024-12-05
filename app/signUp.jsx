import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Ionicons } from "@expo/vector-icons"; // Import icons
import Loading from "../components/Loading";
import { useAuth } from "../hooks/authContext";
import { useRouter } from "expo-router";

export default function signUp() {
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword2, setHidePassword2] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const emailRef = useRef("");
  const passRef = useRef("");
  const confirmPassRef = useRef("");
  const usernameRef = useRef("");
  const { register } = useAuth();

  const handelRegister = async () => {
    if (
      !emailRef.current ||
      !usernameRef.current ||
      !passRef.current ||
      !confirmPassRef.current
    ) {
      Alert.alert("Register", "Please fill all the fields");
      return;
    }
    console.log(passRef.current, confirmPassRef.current);
    if (passRef.current != confirmPassRef.current) {
      Alert.alert("Register", "Password miss match");
      return;
    }
    setLoading(true);

    let response = await register(
      usernameRef.current,
      emailRef.current,
      passRef.current
    );
    setLoading(false);
    if (!response.success) {
      Alert.alert("Sign Up", response.msg);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white gap-5">
      <Image
        style={{
          height: hp(20),
          width: wp(50),
        }}
        source={require("../assets/images/register.png")}
      />
      <TextInput
        onChangeText={(value) => (usernameRef.current = value.trim())}
        className="rounded-xl"
        style={{
          height: hp(8),
          width: wp(85),
          backgroundColor: "#FAF9F6",
          fontFamily: "OpenSans-Bold",
        }}
        placeholder="Enter username"
        placeholderTextColor="#aaa"
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
        placeholder="Enter email"
        placeholderTextColor="#aaa"
      />
      <View style={styles.container}>
        <TextInput
          onChangeText={(value) => (passRef.current = value.trim())}
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#aaa"
          secureTextEntry={hidePassword} // Toggle visibility
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setHidePassword(!hidePassword)} // Toggle password visibility
        >
          <Ionicons
            name={hidePassword ? "eye-off-outline" : "eye-outline"}
            size={hp(3)}
            color="#aaa"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TextInput
          onChangeText={(value) => (confirmPassRef.current = value.trim())}
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#aaa"
          secureTextEntry={hidePassword2} // Toggle visibility
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setHidePassword2(!hidePassword2)} // Toggle password visibility
        >
          <Ionicons
            name={hidePassword2 ? "eye-off-outline" : "eye-outline"}
            size={hp(3)}
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
            onPress={handelRegister}
          >
            <Text
              style={{
                fontFamily: "OpenSans-Bold",
                color: "white",
                fontSize: hp(2),
                textAlign: "center",
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange input and icon horizontally
    alignItems: "center",
    backgroundColor: "#FAF9F6",
    borderRadius: hp(1),
    width: wp(85),
    height: hp(8),
  },
  input: {
    flex: 1, // Takes up available space
    fontFamily: "OpenSans-Bold",
    color: "#252525",
  },
  icon: {
    padding: 5, // Add some padding for better touch area
  },
});
