import * as React from "react";
import { Image, Text, View } from "react-native";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MyComponent = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleCart = () => {
    // navigate to cart page
  };

  const handleProfile = () => {
    // navigate to profile page
  };
  const handleLogout = async () => {
    //logout
    await logout();
  };

  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      <Searchbar
        placeholder="Search title/author"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          height: hp(7),
          width: wp(70),
          backgroundColor: "#DEDEDE",
          borderRadius: hp(1.2),
          marginLeft: hp(3),
        }}
      />
      <View
        style={{
          backgroundColor: "#DEDEDE",
          height: hp(7),
          width: wp(13),
          borderRadius: hp(1.2),
          marginStart: hp(2),
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FontAwesome name="filter" size={hp(3)} color="black" />
      </View>
    </Appbar.Header>
  );
};

export default MyComponent;
const Divider = () => {
  return <View className="p-[1px] w-full bg-neutral-200" />;
};
