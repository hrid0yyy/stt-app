import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const bestDeals = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSISNmEsCHVy9pJPplRUIar3DJqM6xPxeIcw&s",
    title: "Tuesday Mooney Talks to Ghosts",
    author: "Kate Racculia",
    genre: "Novel",
    price: "$33.00",
    discount: "12% off",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSISNmEsCHVy9pJPplRUIar3DJqM6xPxeIcw&s",
    title: "Another Book Title",
    author: "Author Name",
    genre: "Science Fiction",
    price: "$29.99",
    discount: "10% off",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSISNmEsCHVy9pJPplRUIar3DJqM6xPxeIcw&s",
    title: "Fictional Book Title",
    author: "Author Example",
    genre: "Fiction",
    price: "$19.99",
    discount: "5% off",
  },
];

const topBooks = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnm09W9fXTDWSPIRTx6BAvYTErKmL3fvTJpA&s",
    title: "The Picture of Dorian Gray",
    author: "Oscar Wilde",
    genre: "Classics",
    price: "$25.00",
  },
  {
    id: 2,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/640px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classics",
    price: "$30.00",
  },
  {
    id: 3,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/640px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Classics",
    price: "$30.00",
  },
];

export default function Home() {
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState("This Week");

  const filters = ["This Week", "This Month", "This Year"];

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const renderBook = ({ item }) => (
    <TouchableOpacity style={styles.bookCard}>
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookDetails}>
        <Text style={styles.bookGenre}>{item.genre}</Text>
        <Text style={styles.bookTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Best Deals Section */}
      <View>
        <Text style={styles.heading}>Best Deals</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContainer}
        >
          {bestDeals.map((deal, index) => (
            <TouchableOpacity
              key={deal.id}
              style={[
                styles.card,
                activeIndex !== index && styles.shadowedCard,
              ]}
              activeOpacity={0.9}
            >
              <Image source={{ uri: deal.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.genre}>{deal.genre}</Text>
                <Text style={styles.title}>{deal.title}</Text>
                <Text style={styles.author}>{deal.author}</Text>
                <View style={styles.priceContainer}>
                  <Text style={styles.price}>{deal.price}</Text>
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>{deal.discount}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {bestDeals.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>
      {/* Top Books Section */}
      <View style={{ marginTop: hp(3) }}>
        <View style={styles.header}>
          <Text style={styles.heading}>Top Books</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>see more</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                activeFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={topBooks}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderBook}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.bookList}
        />
      </View>
      {/* bottom space */}
      <View style={{ height: hp(5) }}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: wp(5),
  },
  heading: {
    fontSize: hp(2.5),
    fontWeight: "bold",
    color: "#000",
  },
  scrollContainer: {
    alignItems: "center",
  },
  card: {
    marginTop: hp(1.5),
    flexDirection: "row",
    width: wp(80),
    height: hp(20),
    borderRadius: wp(2),
    backgroundColor: "#121212",
    marginHorizontal: wp(1),
    overflow: "hidden",
  },
  shadowedCard: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  image: {
    width: wp(25),
    height: "100%",
  },
  details: {
    flex: 1,
    padding: wp(3),
    justifyContent: "space-between",
  },
  genre: {
    color: "#aaa",
    fontSize: hp(1.5),
  },
  title: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  author: {
    color: "#ccc",
    fontSize: hp(1.5),
    marginBottom: hp(1),
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "bold",
  },
  discountBadge: {
    backgroundColor: "#fff",
    borderRadius: wp(1),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(2),
  },
  discountText: {
    fontSize: hp(1.5),
    fontWeight: "bold",
    color: "#000",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(1),
  },
  dot: {
    height: hp(1),
    width: hp(1),
    borderRadius: hp(0.5),
    backgroundColor: "#ccc",
    marginHorizontal: wp(1),
  },
  activeDot: {
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  seeMore: {
    fontSize: hp(2),
    color: "#121212",
  },
  filterContainer: {
    flexDirection: "row",
    marginBottom: hp(2),
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: wp(2),
    paddingVertical: hp(1),
    paddingHorizontal: wp(4),
    marginRight: wp(2),
  },
  activeFilter: {
    backgroundColor: "#000",
  },
  filterText: {
    fontSize: hp(1.4),
    color: "#000",
  },
  activeFilterText: {
    color: "#fff",
  },
  bookList: {
    marginTop: hp(1),
  },
  bookCard: {
    width: wp(40),
    backgroundColor: "#121212",
    borderRadius: wp(2),
    marginRight: wp(4),
    overflow: "hidden",
  },
  bookImage: {
    width: "100%",
    height: hp(20),
  },
  bookDetails: {
    padding: wp(3),
  },
  bookGenre: {
    color: "#aaa",
    fontSize: hp(1.5),
    marginBottom: hp(0.5),
  },
  bookTitle: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "bold",
    marginBottom: hp(0.5),
  },
  bookAuthor: {
    color: "#ccc",
    fontSize: hp(1.5),
    marginBottom: hp(1),
  },
  bookPrice: {
    color: "#fff",
    fontSize: hp(2),
    fontWeight: "bold",
  },
});
