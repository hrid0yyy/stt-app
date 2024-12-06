import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { useAuth } from "@/hooks/authContext";

const HomeHeader = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const navigation = useNavigation();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      {/* Drawer Trigger Icon */}
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Ionicons
          name="menu"
          size={hp(4)}
          color="black"
          style={{ marginLeft: hp(2) }}
        />
      </TouchableOpacity>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          height: hp(7),
          width: wp(70),
          backgroundColor: "#DEDEDE",
          borderRadius: hp(1.2),
          marginLeft: hp(2),
        }}
      />

      {/* Notifications and Logout Menu */}

      <Ionicons
        style={{ marginLeft: hp(2) }}
        name="notifications"
        size={hp(4)}
        color="black"
      />
    </Appbar.Header>
  );
};

export default HomeHeader;

const Divider = () => {
  return (
    <View style={{ height: 1, backgroundColor: "#E0E0E0", width: "100%" }} />
  );
};
