import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, FontAwesome } from "@expo/vector-icons/";
import { useRouter } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Feather from "@expo/vector-icons/Feather";
import Modal from "react-native-modal";
import AddItem from "../../components/AddItem";
export default function ExchangeBooks() {
  const [addItemModal, setAddItemModal] = useState(false);
  const router = useRouter();
  const genre = "Non Ficiton ,Fiction , Novel asdsad";
  const toggleItemModal = () => {
    setAddItemModal(!addItemModal);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={hp(4)} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exchange Books</Text>
      </View>

      <ScrollView>
        <View className="gap-10 items-center mt-5">
          <View
            style={{
              height: hp(25),
              width: wp(90),
              backgroundColor: "#333",
              flexDirection: "row",
              alignItems: "center",
              padding: hp(1),
              borderRadius: hp(1),
            }}
          >
            {/* Left: Image */}
            <View style={{ flex: 1, marginRight: hp(1) }}>
              <Image
                source={{
                  uri: "https://agathachristie.imgix.net/image-store/Shop-2021/Jacket_APocketFullOfRye-UK.jpg?auto=compress,format&fit=clip&q=65&w=400",
                }} // Replace with your image URI
                style={{ width: "100%", height: "100%", borderRadius: hp(1) }}
                resizeMode="cover"
              />
            </View>

            {/* Right: Information */}
            <View style={{ flex: 2, justifyContent: "space-around" }}>
              <Text
                style={{
                  fontSize: hp(2.2),
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: hp(2),
                }}
              >
                The Great Gatsby
              </Text>
              <Text style={{ fontSize: hp(1.6), color: "gray" }}>
                Created At:{" "}
                <Text style={{ fontSize: hp(1.8), color: "white" }}>
                  {" "}
                  01-12-2024{" "}
                </Text>
              </Text>
              <Text style={{ fontSize: hp(1.6), color: "gray" }}>
                Total Requests:{" "}
                <Text style={{ fontSize: hp(1.8), color: "white" }}> 15 </Text>
              </Text>
              <Text style={{ fontSize: hp(1.6), color: "gray" }}>
                Preferred Item:{" "}
                <Text style={{ fontSize: hp(1.8), color: "white" }}>
                  {" "}
                  {genre.substring(0, 20)}...
                </Text>
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: hp(20),
                  marginTop: hp(1),
                }}
              >
                <TouchableOpacity style={{ marginRight: hp(2) }}>
                  <Feather name="edit" size={hp(3)} color="white" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <AntDesign name="notification" size={hp(3)} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* add item modal */}
      <Modal isVisible={addItemModal}>
        <View style={{ flex: 1 }}>
          <AddItem />
          <Button title="Hide modal" color="#333" onPress={toggleItemModal} />
        </View>
      </Modal>
      {/* Add Button */}
      <TouchableOpacity style={styles.addButton} onPress={toggleItemModal}>
        <AntDesign name="plus" size={hp(3)} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    margin: 20,
  },
  headerTitle: {
    marginRight: wp(20),
    fontSize: hp(2.4),
  },
  addButton: {
    position: "absolute",
    bottom: hp(4), // Adjust the distance from the bottom
    right: wp(4), // Adjust the distance from the right
    backgroundColor: "#333", // Change to your preferred color
    width: hp(7), // Diameter of the button
    height: hp(7), // Diameter of the button
    borderRadius: hp(3.5), // Make it fully rounded
    alignItems: "center",
    justifyContent: "center",
    elevation: 5, // For Android shadow
    shadowColor: "#000", // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
