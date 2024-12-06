import { View, Text, ScrollView } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CartItem from "../../components/CartItem";
import Button from "../../components/Button";

export default function Cart() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "white",
        paddingHorizontal: wp(5),
      }}
    >
      <Text
        style={{
          fontFamily: "open-sans",
          marginStart: hp(3),
          fontSize: hp(3),
          marginTop: hp(2),
          marginBottom: hp(2),
        }}
      >
        Cart
      </Text>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <CartItem
            image={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-C_UAhXq9GfuGO452EEzfbKnh1viQB9EDBQ&s"
            }
            title={"Meow Meow Meow kire bhai ki ks"}
            amount={1}
            price={100}
            type={"Novel"}
            writer={"Meow"}
            shop={"Meow Shop"}
          />
        </View>

        <View
          style={{
            width: wp(80),
            marginTop: hp(5),
            alignItems: "center",
          }}
        >
          {/* Order Summary Title */}
          <Text
            style={{
              fontSize: hp(2.5),
              fontWeight: "bold",
              marginBottom: hp(2),
            }}
          >
            Order Summary
          </Text>

          {/* Sub Total */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: hp(1),
            }}
          >
            <Text style={{ fontSize: hp(2), fontWeight: "300" }}>
              Sub Total
            </Text>
            <Text style={{ fontSize: hp(2), fontWeight: "300" }}>৳ 100</Text>
          </View>

          {/* Shipping Cost */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginBottom: hp(1),
            }}
          >
            <Text style={{ fontSize: hp(2), fontWeight: "300" }}>
              Shipping Cost
            </Text>
            <Text style={{ fontSize: hp(2), fontWeight: "300" }}>৳ 20</Text>
          </View>

          {/* Total Price */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              borderTopWidth: 1,
              borderColor: "#ccc",
              paddingTop: hp(2),
            }}
          >
            <Text style={{ fontSize: hp(2.5), fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontSize: hp(2.5), fontWeight: "bold" }}>৳ 120</Text>
          </View>
        </View>

        <View style={{ marginTop: hp(5), alignItems: "center" }}>
          <Button handle={() => {}} title={"Proceed to checkout"} />
        </View>
      </ScrollView>
    </View>
  );
}
