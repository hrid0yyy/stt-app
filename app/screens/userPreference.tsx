import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import LinearGradient from "react-native-linear-gradient";
import { supabase } from "@/supabaseConfig";
const genres = [
  "Novel",
  "SciFi",
  "Children",
  "Dark",
  "History",
  "Romance",
  "Mystery",
  "Thriller",
  "Horror",
  "Religious",
  "Academic",
];
import { ProgressBar, MD3Colors } from "react-native-paper";
import { useAuth } from "@/hooks/authContext";
import { useRouter } from "expo-router";
export default function userPreference() {
  const { user } = useAuth();
  const [selectedGenres, setSelectedGenres] = useState([]);
  const { setInPreference } = useAuth();
  const router = useRouter();
  // Toggle selection
  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((item) => item !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const handle = async () => {
    setInPreference(false);
    const genres = selectedGenres.join(",");
    console.log(genres);
    const { data, error } = await supabase
      .from("users") // Specify the table name
      .update({
        preferred_genre: genres,
      })
      .eq("id", user?.id); // Match the user by ID

    if (error) {
      throw new Error(error.message);
    }
  };
  return (
    <>
      <ImageBackground
        style={{ height: hp(100), width: wp(100) }}
        source={require("../../assets/images/grad-back.jpg")}
      >
        <ProgressBar progress={0.5} color={MD3Colors.error50} />
        <TouchableOpacity style={{ marginLeft: wp(85), marginTop: hp(2) }}>
          <Text style={{ fontSize: hp(2), color: "white" }}>Skip</Text>
        </TouchableOpacity>
        <View className="flex-row items-center justify-center">
          <Text
            className="font-bold"
            style={{ color: "white", fontSize: hp(5) }}
          >
            Choose your favorite genres
          </Text>
        </View>
        <View
          className="flex-row items-center justify-center"
          style={{
            marginTop: hp(5),
            gap: 7,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          {genres.map((genre, index) => {
            const isSelected = selectedGenres.includes(genre);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.genreBlock,
                  {
                    backgroundColor: isSelected ? "white" : "black",
                  },
                ]}
                onPress={() => toggleGenre(genre)}
              >
                <Text
                  style={{
                    color: isSelected ? "black" : "white",
                  }}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="flex-1 items-center justify-center">
          <View
            style={{
              backgroundColor: "#310b0b",
              height: hp(7),
              width: wp(50),
              marginTop: hp(20),
              borderRadius: hp(5),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity onPress={handle}>
              <Text
                style={{ textAlign: "center", color: "white", fontSize: hp(3) }}
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap", // Allow wrapping to new rows
    justifyContent: "center",
    gap: 10, // Space between items
    marginTop: hp(5),
  },
  genreBlock: {
    height: hp(7), // Height defined by percentage
    width: wp(25), // Width defined by percentage
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    borderRadius: hp(2), // Rounded corners
    margin: 5, // Space between blocks
  },
  gradient: {
    flex: 1,
  },
});
