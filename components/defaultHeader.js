import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function defaultHeader({ title }) {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: "white" }}>
      {/* Drawer Trigger Icon */}

      <View className="gap-5 flex-row items-center">
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
        <Text style={{ fontSize: hp(2.5) }}>{title}</Text>
      </View>
    </Appbar.Header>
  );
}
