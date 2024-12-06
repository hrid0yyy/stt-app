import { View, Text } from "react-native";
import React from "react";
import Header from "../../components/defaultHeader";
export default function inbox() {
  return (
    <View className="flex-1 bg-white">
      <Header />
      <Text>Inbox</Text>
    </View>
  );
}
