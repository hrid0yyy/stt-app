import React from "react";
import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { MenuProvider } from "react-native-popup-menu";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import HomeHeader from "../../components/HomeHeader";
import Fontisto from "@expo/vector-icons/Fontisto";
import profile from "../screens/profile";
import settings from "../screens/settings";
import Entypo from "@expo/vector-icons/Entypo";
import inbox from "../screens/inbox";
import { useAuth } from "@/hooks/authContext";
import AntDesign from "@expo/vector-icons/AntDesign";

const Drawer = createDrawerNavigator();

function DrawerContent() {
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#E6E6E6",
          width: wp(60),
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "black",
        drawerActiveBackgroundColor: "black",
        headerShown: false, // Disable default Drawer header
      }}
      drawerContent={(drawerProps) => (
        <View style={{ flex: 1 }}>
          {/* User Info Section */}
          <ImageBackground
            source={require("../../assets/images/drawer-header-background.jpg")} // Path to your local image
            resizeMode="cover" // Ensures the image covers the entire view
          >
            <View className="mt-7 ml-7 mb-8 gap-3">
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqaXRrLoiFQHF1rlJkUiOvUjCTWx3dfJd7eXQxVfrCLwOkn1wo-CWjRPOi5xaGZQ5v-Lc&usqp=CAU",
                }}
                style={{
                  height: hp(10),
                  aspectRatio: 1,
                  borderRadius: hp(50),
                }}
                resizeMode="cover"
              />
              <Text style={{ color: "white", fontSize: hp(3) }}>
                {user?.username}
              </Text>
            </View>
          </ImageBackground>
          {/* Drawer Items */}
          <DrawerContentScrollView {...drawerProps}>
            <DrawerItemList {...drawerProps} />
          </DrawerContentScrollView>

          {/* Logout Button */}
          <View className="justify-center items-center mb-5">
            <View>
              <TouchableOpacity
                style={{
                  backgroundColor: "#121212",
                  height: hp(6),
                  width: wp(50),
                  borderRadius: hp(1.5),
                  justifyContent: "center", // Center vertically
                  alignItems: "center", // Center horizontally
                }}
                onPress={handleLogout}
              >
                <View className="flex-row justify-center items-center">
                  <MaterialIcons name="logout" size={hp(3)} color="white" />
                  <Text
                    style={{
                      fontFamily: "OpenSans-Bold",
                      color: "white",
                      fontSize: hp(2),
                      textAlign: "center",
                      marginLeft: hp(1),
                    }}
                  >
                    Logout
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    >
      <Drawer.Screen
        name="Home"
        component={HomeTabs}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="home" // Choose the icon name
              size={size} // Automatically provided by React Navigation
              color={focused ? "white" : "black"} // Change color based on focus state
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={profile}
        options={{
          drawerIcon: ({ focused, size }) => (
            <MaterialIcons
              name="account-box" // Choose the icon name
              size={size} // Automatically provided by React Navigation
              color={focused ? "white" : "black"} // Change color based on focus state
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Inbox"
        component={inbox}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Entypo
              name="message" // Choose the icon name
              size={size} // Automatically provided by React Navigation
              color={focused ? "white" : "black"} // Change color based on focus state
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={settings}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Fontisto
              name="player-settings" // Choose the icon name
              size={size} // Automatically provided by React Navigation
              color={focused ? "white" : "black"} // Change color based on focus state
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

function HomeTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#E6E6E6", height: hp(9) },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: hp(1.5),
          marginTop: hp(1),
          color: "black",
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          header: () => <HomeHeader />, // Use custom header for Home

          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Entypo
                name="home"
                size={hp(3)}
                color={focused ? "white" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="category"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <MaterialIcons
                name="category"
                size={hp(3)}
                color={focused ? "white" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <FontAwesome
                name="shopping-cart"
                size={hp(3)}
                color={focused ? "white" : "black"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused ? styles.activeTab : styles.inactiveTab,
              ]}
            >
              <Octicons
                name="people"
                size={hp(3)}
                color={focused ? "white" : "black"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

export default function _layout() {
  return (
    <MenuProvider>
      <DrawerContent />
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  userInfo: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(3),
  },
  userImage: {
    width: hp(10),
    height: hp(10),
    borderRadius: hp(5),
  },
  userName: {
    marginTop: hp(1),
    color: "white",
    fontSize: hp(2.5),
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "red",
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontWeight: "bold",
    fontSize: hp(2),
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: wp(20),
    height: hp(5),
    borderRadius: hp(8),
    marginTop: hp(1),
  },
  activeTab: {
    backgroundColor: "black",
  },
  inactiveTab: {
    backgroundColor: "transparent",
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E6E6E6",
  },
  screenText: {
    fontSize: hp(2.5),
    color: "#121212",
  },
});
