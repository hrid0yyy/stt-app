import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function CartItem({
  image,
  title,
  type,
  writer,
  amount,
  price,
  shop,
}) {
  return (
    <Card
      style={{
        marginVertical: hp(1),
        marginHorizontal: wp(2),
        width: wp(80),
        backgroundColor: "#121212", // Custom color
        borderRadius: hp(2),
      }}
      elevation={4} // Adds shadow/elevation
    >
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        {/* Image Section */}
        <Image
          source={{ uri: image }}
          style={{
            height: hp(15),
            width: wp(25),
            borderRadius: hp(1),
          }}
          resizeMode="cover"
        />

        {/* Close Icon */}
        <AntDesign
          name="close"
          size={hp(3)}
          color="white"
          style={{
            position: "absolute",
            top: hp(1),
            right: hp(1),
          }}
        />

        {/* Text Section */}
        <View style={{ marginLeft: wp(3), flex: 1 }}>
          <Text
            style={{
              color: "white",
              fontSize: hp(1.5),
              fontWeight: "300",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {type}
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: hp(1.7),
              fontWeight: "500",
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: hp(1.4),
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {writer}
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: hp(1.4),
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {shop}
          </Text>

          {/* Amount and Price Section */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: hp(1),
            }}
          >
            <TouchableOpacity>
              <Entypo name="squared-minus" size={hp(3)} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                color: "white",
                fontSize: hp(1.5),
                marginHorizontal: wp(2),
              }}
            >
              {amount}
            </Text>

            <TouchableOpacity>
              <Entypo name="squared-plus" size={hp(3)} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                color: "white",
                fontSize: hp(1.5),
                marginLeft: wp(10),
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              ৳ {price}
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}
