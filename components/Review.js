import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
const ReviewsScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [like, setLike] = useState(false);
  const [review, setReview] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };
  const reviews = [
    {
      id: "1",
      user: "Luffy",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQbYchymDL1NSWI5G64nXmAefMu_8GTrUQ&s", // Replace with real image URL
      rating: 4,
      review:
        "Finished this book about a month ago but it’s taken me this long to write a review...",
      date: "July 23, 2011",
      followers: 243,
    },
    {
      id: "1",
      user: "Luffy",
      profilePic:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGQbYchymDL1NSWI5G64nXmAefMu_8GTrUQ&s", // Replace with real image URL
      rating: 4,
      review:
        "Finished this book about a month ago but it’s taken me this long to write a review...",
      date: "July 23, 2011",
      followers: 243,
    },
    // Add more reviews as needed
  ];

  return (
    <View style={styles.container}>
      {/* Ratings & Reviews Header */}
      <Text style={styles.header}>Ratings & Reviews</Text>
      {/* User Input Section */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Modal Content */}
          <View
            style={{
              height: hp(40),
              width: wp(80),
              borderRadius: hp(5),
              backgroundColor: "white",
              padding: 20,
              justifyContent: "space-between",
              shadowColor: "#000",
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 10,
            }}
          >
            {/* Header */}
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#333",
                textAlign: "center",
              }}
            >
              Write Your Review
            </Text>

            {/* Input Field */}
            <TextInput
              onChangeText={setReview}
              placeholder="Type your review here..."
              multiline={true}
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 10,
                padding: 10,
                textAlignVertical: "top",
                height: hp(20),
                backgroundColor: "#f9f9f9",
                color: "#333",
              }}
            />

            {/* Buttons */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {/* Close Button */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  flex: 1,
                  marginRight: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>

              {/* Submit Button */}
              <TouchableOpacity
                onPress={() => {
                  console.log("Review Submitted:", review);
                  setModalVisible(false);
                  setReview(""); // Clear review field after submission
                }}
                style={{
                  backgroundColor: "#333",
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderRadius: 10,
                  flex: 1,
                  marginLeft: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    fontSize: 14,
                  }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.reviewInputSection}>
        <TouchableOpacity
          onPress={() => setModalVisible(!modalVisible)}
          style={{
            height: hp(6),
            width: wp(40),

            justifyContent: "center",
            borderWidth: 1, // Border thickness
            borderColor: "#333", // Border color
            borderRadius: hp(10),
          }}
        >
          <Text style={{ textAlign: "center" }}>Write a Review</Text>
        </TouchableOpacity>
      </View>
      {/* Community Reviews */}
      <View style={styles.communityReviews}>
        <Text style={styles.sectionHeader}>Community Reviews</Text>
        <Text style={styles.ratingValue}>
          4.35 <Text style={styles.ratingCount}>(3,246 ratings)</Text>
        </Text>

        {/* Rating Bars */}
        {[5, 4, 3, 2, 1].map((star) => (
          <View key={star} style={styles.ratingBar}>
            <Text style={styles.starText}>{star} </Text>
            <View style={styles.ratingBarTrack}>
              <View
                style={[styles.ratingBarFill, { width: `${star * 20}%` }]}
              />
            </View>
          </View>
        ))}
      </View>

      {/* List of Reviews */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Image
              source={{ uri: item.profilePic }}
              style={styles.profilePic}
            />
            <View style={styles.reviewContent}>
              <View style={styles.reviewHeader}>
                <Text style={styles.username}>{item.user}</Text>
                <Text style={styles.reviewDate}>{item.date}</Text>
              </View>
              <Text style={styles.reviewText}>{item.review}</Text>
              <View className="flex-row items-center">
                {" "}
                <Text style={styles.followersText}>
                  {item.followers} followers
                </Text>
                <TouchableOpacity onPress={handleLike}>
                  {like ? (
                    <AntDesign
                      name="like1"
                      style={{ marginLeft: wp(3) }}
                      size={hp(2)}
                      color="black"
                    />
                  ) : (
                    <AntDesign
                      name="like2"
                      style={{ marginLeft: wp(3) }}
                      size={hp(2)}
                      color="black"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reviewInputSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  inputHeader: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  star: {
    fontSize: 24,
    color: "#ffcc00",
    marginHorizontal: 5,
  },
  writeReviewButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  writeReviewText: {
    color: "#fff",
    fontSize: 16,
  },
  communityReviews: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  ratingValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  ratingCount: {
    fontSize: 14,
    color: "#888",
  },
  ratingBar: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  starText: {
    width: 50,
    fontSize: hp(1.6),
  },
  ratingBarTrack: {
    flex: 1,
    height: hp(1),
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: hp(2),
    overflow: "hidden",
  },
  ratingBarFill: {
    height: "100%",
    backgroundColor: "#333",
  },

  reviewCard: {
    flexDirection: "row",
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  reviewDate: {
    fontSize: 12,
    color: "#888",
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  followersText: {
    fontSize: hp(1.4),
    color: "#888",
  },
});

export default ReviewsScreen;
