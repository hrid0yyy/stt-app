import { useAuth } from "@/hooks/authContext";
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

const AccountScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 20,
        backgroundColor: "#f5f5f5",
      }}
    >
      <View className="flex-row" style={{ width: wp(95) }}>
        <TouchableOpacity
          onPress={() => {
            router.push("/screens/profile");
          }}
        >
          {" "}
          <AntDesign name="left" size={hp(3)} color="black" />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Account
      </Text>

      {/* Profile Image */}

      <Image
        source={{ uri: user?.profileUrl }}
        style={{
          height: hp(15),
          aspectRatio: 1,
          marginBottom: hp(3),
          borderRadius: hp(100),
        }}
      />
      {/* Info Fields */}
      <ScrollView>
        <View
          style={{
            width: "100%",
            marginBottom: 10,
            backgroundColor: "#e0e0e0",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Name:</Text>
          <TextInput
            style={{
              fontSize: 16,
              marginTop: 5,
            }}
            value={user?.fullName}
            editable={false}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginBottom: 10,
            backgroundColor: "#e0e0e0",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>E-mail:</Text>
          <TextInput
            style={{
              fontSize: 16,
              marginTop: 5,
            }}
            value={user?.email}
            editable={false}
          />
        </View>

        <View
          style={{
            width: "100%",
            marginBottom: 20,
            backgroundColor: "#e0e0e0",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Address:</Text>
          <TextInput
            style={{
              fontSize: 16,
              marginTop: 5,
            }}
            value={user?.location}
            editable={false}
            multiline
          />
        </View>
        <View
          style={{
            width: "100%",
            marginBottom: 20,
            backgroundColor: "#e0e0e0",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "bold" }}>Number:</Text>
          <TextInput
            style={{
              fontSize: 16,
              marginTop: 5,
            }}
            value={user?.number}
            editable={false}
            multiline
          />
        </View>
      </ScrollView>
      {/* Action Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Edit Button */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#333",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 10,
            marginRight: 10,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16 }}>Edit</Text>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "#fff",
            paddingVertical: 10,
            alignItems: "center",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#333",
          }}
        >
          <Text style={{ color: "#333", fontSize: 16 }}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;
