import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { ProgressBar, MD3Colors } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";
import { Button } from "react-native-paper";
import { useRouter } from "expo-router";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../supabaseConfig";
import { FileObject } from "@supabase/storage-js";
import { useAuth } from "@/hooks/authContext";
import Loading from "../../components/Loading";
export default function userDetails() {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [location, setLocation] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [imageMetadata, setImageMetadata] = useState(null);
  const { user, updateUserDetails } = useAuth();
  const [files, setFiles] = useState<FileObject[]>([]);
  const router = useRouter();
  // Dropdown options for location
  const locationOptions = [
    { label: "Dhaka", value: "Dhaka" },
    { label: "Chittagong", value: "Chittagong" },
    { label: "Rajshahi", value: "Rajshahi" },
    { label: "Barishal", value: "Barishal" },
    { label: "Sylhet", value: "Sylhet" },
  ];

  // Function to handle image picking
  useEffect(() => {
    console.log("--->", user);
  }, []);
  const pickImage = async () => {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    };
    const result = await ImagePicker.launchImageLibraryAsync(options);
    setUserImage(result.assets[0].uri);
    // console.log(result.assets[0].uri);
    if (!result.canceled) {
      //  setUserImage(result.assets[0]); // cant be assigned

      const img = result.assets[0];
      const base64 = await FileSystem.readAsStringAsync(img.uri, {
        encoding: "base64",
      });
      const filePath = `${user!.id}/${user!.username}.${
        img.type === "image" ? "jpeg" : "jpg"
      }`;

      const contentType = img.type === "image" ? "image/jpeg" : "image/jpg";

      setImageMetadata({ base64, filePath, contentType });
    }
    console.log(setImageMetadata);
  };
  function validateMobileNumber(number) {
    // Check if the input is a string and exactly 11 characters long

    if (typeof number !== "string" || number.length == 11) {
      return false;
    }

    // Check if the mobile number starts with "01"
    return number.startsWith("01");
  }
  const handleDetails = async () => {
    setLoading(true);
    if (
      fullName == "" ||
      mobileNumber == "" ||
      location == "" ||
      userImage == null ||
      imageMetadata == null ||
      validateMobileNumber(mobileNumber)
    ) {
      Alert.alert("Alert", "Please fill up all the necessary information!!");
      setLoading(false);
      return;
    }
    try {
      const { base64, filePath, contentType } = imageMetadata;

      // Upload the image to Supabase
      const { error } = await supabase.storage
        .from("stt-storage")
        .upload(filePath, decode(base64), { contentType });

      if (error) {
        throw new Error("Error uploading image: " + error.message);
      }

      console.log("Image uploaded successfully:", filePath);
      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from("stt-storage").getPublicUrl(filePath);
      await updateUserDetails(fullName, mobileNumber, location, publicUrl);
      // Perform database operations or other logic here

      // Navigate to the next screen
      // router.push("/screens/userPreference");
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", error.message);
      setLoading(false);
    }

    router.push("/screens/userPreference");
  };

  return (
    <ImageBackground
      style={{ height: hp(100), width: wp(100) }}
      source={require("../../assets/images/grad-back.jpg")}
    >
      <ProgressBar progress={0} color={MD3Colors.error50} />

      <View style={{ marginTop: hp(5), marginLeft: wp(5) }}>
        <Text style={{ color: "white", fontSize: hp(4), fontWeight: "bold" }}>
          Enter your details
        </Text>
      </View>

      <Image
        source={{
          uri: userImage
            ? userImage
            : "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png", // Replace with your default image URL
        }}
        style={{
          width: wp(30),
          height: wp(30),
          borderRadius: wp(15),
          alignSelf: "center",
          marginTop: hp(2),
        }}
      />
      {userImage && (
        <Pressable
          onPress={() => {
            setUserImage(null);
            setImageMetadata(null);
          }}
        >
          <Text style={{ textAlign: "center", color: "gray" }}>Remove</Text>
        </Pressable>
      )}

      <View style={{ marginTop: hp(3), marginHorizontal: wp(5) }}>
        {/* Full Name */}
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="gray"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          style={styles.inputField}
        />

        {/* Mobile Number */}
        <TextInput
          placeholder="Mobile Number"
          placeholderTextColor="gray"
          value={mobileNumber}
          onChangeText={(text) => setMobileNumber(text)}
          keyboardType="phone-pad"
          style={styles.inputField}
        />

        {/* Location Dropdown */}
        <RNPickerSelect
          onValueChange={(value) => setLocation(value)}
          items={locationOptions}
          placeholder={{
            label: "Select your location",
            value: null,
            color: "gray",
          }}
          style={{
            inputIOS: {
              ...styles.inputField,
              height: hp(9),
              fontSize: hp(2),
              paddingVertical: hp(1.5),
              borderRadius: hp(1),
            },
            inputAndroid: {
              ...styles.inputField,
              height: hp(9),
              fontSize: hp(2),
              paddingVertical: hp(1.5),
              borderRadius: hp(1),
            },
          }}
          value={location}
        />

        {/* User Image */}
        <Button
          icon="camera"
          mode="contained"
          buttonColor="black"
          onPress={pickImage}
        >
          {userImage ? "Change Image" : "Upload Picture"}
        </Button>
      </View>

      <View style={{ marginTop: hp(5), alignItems: "center" }}>
        {loading ? (
          <Loading size={hp(10)} />
        ) : (
          <TouchableOpacity onPress={handleDetails} style={styles.submitButton}>
            <Text style={{ color: "white", fontSize: hp(2.5) }}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: hp(1),
    padding: hp(2),
    fontSize: hp(2),
    marginBottom: hp(2),
    color: "white",
  },
  imagePicker: {
    borderWidth: 2,
    borderColor: "black",
    borderRadius: hp(1),
    alignItems: "center",
    justifyContent: "center",
    padding: hp(2),
    marginTop: hp(2),
  },
  submitButton: {
    backgroundColor: "#310b0b",
    height: hp(7),
    width: wp(50),
    borderRadius: hp(5),
    alignItems: "center",
    justifyContent: "center",
  },
});
