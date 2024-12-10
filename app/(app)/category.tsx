import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CategoryCard from "../../components/CategoryCard";
import CategoryHeader from "../../components/CategoryHeader";
import Exchange from "@/components/Exchange";
export default function Category() {
  const [type, setType] = useState("");

  //debug
  useEffect(() => {
    console.log(type);
  });

  if (type == "Exchange") return <Exchange goBack={setType} />;
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
          <TouchableOpacity
            onPress={() => {
              setType("Exchange");
            }}
          >
            <View
              style={{
                borderRadius: hp(2),
                height: hp(18),
                width: wp(85),
                overflow: "hidden",
              }}
            >
              <ImageBackground
                source={require("../../assets/images/exchange-books-background.jpg")}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                imageStyle={{
                  borderRadius: hp(2),
                }}
              >
                {/* Gradient Overlay */}
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.1)"]} // Darker at the top, lighter at the bottom
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "bold",
                    }}
                  >
                    Exchange Books
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                borderRadius: hp(2),
                height: hp(18),
                width: wp(85),
                overflow: "hidden",
              }}
            >
              <ImageBackground
                source={require("../../assets/images/borrow-books-background.jpg")}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                imageStyle={{
                  borderRadius: hp(2),
                }}
              >
                {/* Gradient Overlay */}
                <LinearGradient
                  colors={["rgba(0, 0, 0, 0.6)", "rgba(0, 0, 0, 0.1)"]} // Darker at the top, lighter at the bottom
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: hp(2),
                      fontWeight: "bold",
                    }}
                  >
                    Borrow Books
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <CategoryCard
              // image={}
              title={"Novel"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <CategoryCard
              // image={}
              title={"Novel"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <CategoryCard
              // image={}
              title={"Novel"}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <CategoryCard
              // image={}
              title={"Novel"}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
