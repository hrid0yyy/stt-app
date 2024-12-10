import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import { useAuth } from "@/hooks/authContext";

export default function Exchange({ goBack }) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const { user } = useAuth();
  const userId = user?.id;
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ip = require("@/utils/ip"); // Adjust the path as needed
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await fetchExchangeBooks(userId);
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
    console.log(books);
  }, []);
  const fetchExchangeBooks = async (userId) => {
    try {
      const response = await axios.get(
        `http://${ip}:3000/exchange/exchange-books`,
        {
          params: { userId },
        }
      );
      return response.data; // This will be the filtered exchange_books data
    } catch (error) {
      console.error(
        "Error fetching exchange books:",
        error.response?.data || error.message
      );
      throw error;
    }
  };
  if (loading) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
    );
  }
  return (
    <View className="flex-1 bg-white">
      <View
        className="flex-row items-center"
        style={{
          marginStart: hp(1),
          marginTop: hp(2),
          marginBottom: hp(2),
        }}
      >
        <TouchableOpacity
          onPress={() => {
            goBack("");
          }}
        >
          <AntDesign
            name="left"
            style={{ marginRight: hp(1) }}
            size={hp(3)}
            color="black"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: hp(3),
          }}
        >
          Exchange Books
        </Text>
      </View>

      <Appbar.Header style={{ backgroundColor: "white" }}>
        <Searchbar
          placeholder="Search title/author"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            height: hp(7),
            width: wp(70),
            backgroundColor: "#DEDEDE",
            borderRadius: hp(1.2),
            marginLeft: hp(3),
          }}
        />
        <View
          style={{
            backgroundColor: "#DEDEDE",
            height: hp(7),
            width: wp(13),
            borderRadius: hp(1.2),
            marginStart: hp(2),
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="filter" size={hp(3)} color="black" />
        </View>
      </Appbar.Header>

      <View className="gap-5 items-center mt-5">
        {books.length > 0 ? (
          books.map((book, index) => (
            <View key={index} style={styles.cardContainer}>
              {/* Book Image */}
              <Image
                source={{
                  uri:
                    book.images.split(",")[0] ||
                    "https://via.placeholder.com/150", // Replace with actual book image URL or placeholder
                }}
                style={styles.bookImage}
                resizeMode="cover"
              />

              {/* Book Information */}
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.bookName}>
                    {book.title || "Unknown Title"}
                  </Text>
                  <Text style={styles.ownerName}>
                    {book.owner || "Unknown Owner"}
                  </Text>
                  <Text style={styles.location}>
                    {book.location || "Unknown Location"}
                  </Text>
                </View>

                {/* View Button */}
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() =>
                    console.log(`View button pressed for ${book.exchangeId}`)
                  }
                >
                  <Text style={styles.viewButtonText}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 20, color: "#777", fontSize: 16 }}>
            No books available for exchange.
          </Text>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  cardContainer: {
    height: hp(25),
    width: wp(90),
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginVertical: 10,
  },
  bookImage: {
    width: wp(25),
    height: "100%",
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  ownerName: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },
  location: {
    fontSize: 14,
    color: "#777",
  },
  viewButton: {
    backgroundColor: "#333",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  viewButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});
