import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import Header from "../../components/defaultHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/hooks/authContext";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  FontAwesome5,
  Entypo,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons"; // Replace with your chosen icon library
import { useRouter } from "expo-router";
export default function profile() {
  const { user } = useAuth();
  const createdAtDate = new Date(user?.createdAt);
  const router = useRouter();
  const menuItems = [
    {
      icon: (
        <MaterialIcons name="account-circle" size={hp(3)} color="#121212" />
      ),
      title: "Profile Details",
      subtitle: "View your profile details.",
      path: "/screens/profileDetails",
    },
    {
      icon: <FontAwesome name="exchange" size={hp(3)} color="#121212" />,
      title: "Exchange Books",
      subtitle: "Add books which you want to exchange with others.",
      path: "/screens/ExchangeBooks",
    },
    {
      icon: <AntDesign name="book" size={hp(3)} color="#121212" />,
      title: "Borrow Books",
      subtitle: "Books you borrowed previously and track the borrow time.",
      path: "/screens/BorrowBooks",
    },
    {
      icon: <Feather name="shopping-cart" size={hp(3)} color="#121212" />,
      title: "Purchase",
      subtitle: "View your all purchase history.",
      path: "/screens/profileDetails",
    },
    {
      icon: <FontAwesome5 name="user-friends" size={hp(3)} color="#121212" />,
      title: "Friends",
      subtitle: "View all your fiends.",
      path: "/screens/profileDetails",
    },
    {
      icon: <Entypo name="add-to-list" size={hp(3)} color="#121212" />,
      title: "Wishlist",
      subtitle:
        "Add your favorite items in your wishlist so you can buy them later.",
      path: "/screens/profileDetails",
    },
  ];
  return (
    <View className="flex-1 bg-white">
      <Header title="Profile" />
      <View
        className="flex-row justify-center items-start"
        style={{
          height: hp(20),
          width: wp(100),
          marginBottom: hp(8),
        }}
      >
        <LinearGradient
          // Gradient colors from dark to light
          colors={["#121212", "#444444", "#888888"]}
          // Start and end points for the gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }} // Horizontal gradient
          style={{
            height: hp(20),
            width: wp(80),
            marginTop: hp(2),
            borderRadius: hp(2),
            padding: hp(2),
            flexDirection: "row",
            alignItems: "center",
            gap: wp(5),
          }}
        >
          <View
            className="flex-row items-center p-8 gap-8"
            style={{
              height: hp(20),
              width: wp(80),
              marginTop: hp(2),
              borderRadius: hp(2),
            }}
          >
            <Image
              source={{ uri: user?.profileUrl }}
              style={{ height: hp(10), width: wp(20), borderRadius: hp(50) }}
            />
            <View>
              <Text style={{ color: "white", fontSize: hp(2.5) }}>
                {user?.username}
              </Text>
              <Text style={{ color: "#dedede", fontSize: hp(1.1) }}>
                Joined : {createdAtDate.toLocaleString()}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                router.push(item.path);
              }}
            >
              <View key={index} style={styles.menuItem}>
                <View style={styles.iconContainer}>{item.icon}</View>
                <View>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginLeft: hp(2),
    marginRight: hp(15),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(2),
  },
  iconContainer: {
    width: wp(20),
    height: hp(10),
    justifyContent: "center",
    alignItems: "center",
    marginRight: hp(2),
    backgroundColor: "#f9f9f9",
    borderRadius: 20,
  },
  title: {
    fontSize: hp(2),
    fontWeight: "600",
    color: "#121212",
  },
  subtitle: {
    fontSize: hp(1.6),
    color: "#7e7e7e",
  },
});
