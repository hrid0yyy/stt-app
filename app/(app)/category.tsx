import React from "react";
import { View, Text, ScrollView, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoryCard from "../../components/CategoryCard";
import CategoryHeader from "../../components/CategoryHeader";

export default function Category() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* Title */}
      <Text
        style={{
          fontFamily: "open-sans",
          marginStart: hp(3),
          fontSize: hp(3),
          marginTop: hp(2),
          marginBottom: hp(2),
        }}
      >
        Categories
      </Text>
      <CategoryHeader />
      {/* Scrollable Categories */}
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: wp(5), // Space between items
            marginTop: hp(5),
          }}
        >
          <CategoryCard
            // image={}
            title={"Novel"}
          />
          <CategoryCard
            // image={}
            title={"Novel"}
          />
          <CategoryCard
            // image={}
            title={"Novel"}
          />
          <CategoryCard
            // image={}
            title={"Novel"}
          />
        </View>
      </ScrollView>
    </View>
  );
}
