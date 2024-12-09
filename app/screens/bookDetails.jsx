import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import Review from "../../components/Review";
export default function bookDetails() {
  const { bookId, type } = useLocalSearchParams();
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);
  const description =
    "1970s Afghanistan: Twelve-year-old Amir is desperate to win the local kite-fighting tournament and his loyal friend Hassan promises to help him. But neither of the boys can foresee what would happen to Hassan that afternoon, an event that is to shatter their lives. After the Russians invade and the family is forced to flee to America, Amir realises that one day he must return to an Afghanistan under Taliban rule to find the one thing that his new world cannot grant him: redemption.";
  const words = description.split(/\s+/);
  const firstThirtyWords = words.slice(0, 30).join(" ");

  const genresString = "Fiction,Historical Fiction,Contemporary,Novel";
  const genres = genresString.split(","); // Split the string into an array

  const [wishlist, setWishlist] = useState(false);
  const [showShopDetails, setShowShopDetails] = useState(false);
  const shopDetails = {
    name: "Elite Bookstore",
    address: "123 Main Street, Springfield",
    description:
      "A cozy place to find all your favorite books, from bestsellers to timeless classics.",
    openingHours: "Monday - Saturday: 9 AM - 9 PM, Sunday: 10 AM - 6 PM",
    contact: "+1 555-123-4567",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABI1BMVEXp7PEOWJkAVJcAUpbdJEMAUZby8vPs7/Dp7PLw8vW3x9rp7fAAU5jw9PYOWJjs7/Rch7IATpZwlrszaqTBzd7u9fJ9m8AAS5RpkrZQfq0dXppReqqnucsASJKtvtEYcbVGdKgAAACGo8HbADDh6u8AS5cARJA9cKF8gocaXZppjLTq9fbfEzkYbbfS3OPI1OGdtc7EyMxYYWSjp611e4FmbnSTl5vY3N/pz9fmt8Xn2dzfUWbbYnLirbXn+PXYPlbswszaLEngjZjecIDgpqvcACniACPgeIfaNlDhmaPg09fmscHcTWTgd4OgvtjinKlGhL6OstVfksJuocsAarsAOouRqsEjX5MAMIRGS1AzPEO1u78ZJi6ZnaAQHCWosbgABRSMLYtgAAAQ20lEQVR4nO1cC1fbONqObSxFVmTZSRzngkNqTEISsBMCCWXaTne63e7OztftXBoGGL7u//8V+0p2LkAoBbLbKUfP6fTEtm6P3rvsTi6noKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgcF/QNbb6c4LiPr+zDb2zyZ8Y/ePnx7k+p7dJifb7uePnJ9+wEPvfbW9vvHiJV0uJ9vnL7/a23755hf/H61ob+MnbjY2Nve3vX/dzNH/jcf/lX7b3RIOTb5Uh7v+wvSGx/UM/f10VKXmTPd3767dqiZT9ZSPD3ov+VWOEi5/2Zk+/798U8DcB/Hp7Y07xzVWKebIguLF9/I0y7H/3dnt7e28vU9RXSzTy/Rfp7T1osf23d/2vt8rHgD7/8eTk+OW7v0t/8vb1krX1/7Et6f30w/Pjk5Mf//nNGiIG8D47fiMFtvCY/Bic7N7GDyd9zinn+BsV4QK8/yNY3d67fmqJlL76CWT6f7m7E55vBhQzCBzbJzy7erm9sff61TecytwAjeJXL7chZKRX/O97Gyds8HQkKBjaUf/l20yIHMieeO/32dde1hrBo3aDvPrHW2mJtP/922PM9rfQ117WOhEFJUb7L7YxBR19/beXfcy2nhRDCgwR5DRvIQOl/M13kIg/QYZgdf1/fc8gI90+yT9Vhjm2cUL5X98x+mQZ9l/+i/MXkJY+WYZQE3L8ToSMp8oQMu7c82ORyzw1hiJaeKI+5FBryAQ8j7a2nlLEp7zrW5IZf/1apqPo/f6Hp8Qwx5si5Isfxyc5UV3Qrd+SJ6WlOVQKBkT8wKLSp+jn337xvvKS1gxcDnQ+P1Gk0f5+/JSKJwD2nKCCMlJ59Ov+r09LR4EUjdtBhLmHEKY42d+PvvaK1g9WcXtoMij++j5iv+wPnpoIc8L2jJ1q4Lpb+/u/7m+Rr72cLwCf48vaUzRwTU3TtvaBo/WnPMGgYECcY4SQx1gUx0mSlOG/JI4jzhgDA/ssWZpjWkHTChX6CwT7Wx0phErMMWYEBkRsDoQIIhiewOP/AreckBhBjMdJc1p0Wl0zCALfd10f4AbtIHC1llMZWDFniNxKk1g+MPzZ+7Cf3NJGzsJglkHYq7VKtm3C+Kapd0utWq8SDqwEZmDk9ikeBIoFt6QZOiUXSJlGoaBrV2Dbmq7puiEYn/amVuSBv1w1FOvouvlz87ebkUIcbsA0sZjFlLMYukQ6gxzeMEyYwKzXKoNyLHZSHIk8mh4nHk0GRTGrWdC+BIax49aLzchbsdEoCfTC+w/70dIjmQRw5OHytKZ/0Sywlb6vt8LNmALPh3MDeyAsXw4bhu8WbE2I6QsBIoU1dMIEtOnqHudRz9U+7P+M8tfmiadimrnI7uQIIi3AHHYjLOeRfMP8AGEiMa3pG19M7PoqTL9eSfpX95hPfG1ri16dJwnrgfuwacAwzFaYUHT/6MqjStc3Yafsu6noIN9VC7SB5Ok0Ynjx4pCi0Nx/P3eGIL5oWvIhhtw9zeq5oWPB9DWnudrwb0ce23fsqlAUMH5zCdI5XG9n+r2ELfl3qn2YX3KUODur5tHFvunLruYupn43ut9LVl72V9odCNU0wWWadr3UcnrFShiG08HmADANK0Wn1ql3wdMIh6ELe7QBRtCw2NzyeBxlu41xs+TrspGwcvCyLvjKwDeNbr1Uas1QqndtHVzLDkQNQxPSXuESbM2951sQPjBvkIPpXa3khINmAquEGMxERBbm6rQ6nUZvWu7DDcRplJQ3IWqWbIhl0oz1oAMcr6oRR4P6jlypcI07RrfjFKci3sVRHoOLlAFfRHwi/JXILyBGFht1G7bXXOEcjOr9vCqpGEvcDIgVXRmFOKQWBFIXcIAQiyDJ4VEtMMHezHqn5LedmIkXExzDshCC/GAzdOqwMYbZ7iRLFCNMmsBPcJMDW3EE7RF0g6ExmFR+7htFyIO58jBlOmgEkblXEi7migbbjfsxRMWsdwEkV69OyxHs580Al8eRDfHLLTUhMiEvrnwcXBEVhzUxEU875s5HJ5qvASWltg++vrKZRH0InF+a2maDwlT92AprmuvOpal37nfqg3qGcIVu0ApFhkIoza/MBlHR1Gw/9IAXbD1GseFcUca8EDaIRtB0gjANjzhyfi+FTUhLEKS5D4hkNE/TTAtSoFbgS2HqpXvKsGpCn9DCHvpsMs3qwgK8uRvDNL4lL+bcY0lTnkUloUXR/eR2GziBfBJYFu7PEGRTAudwRyKPGcQxP15kLsI0b20NFpYuC62xQICRQBVqhl66p5YWDa3OV3yKdgV5kUpr9tc+j8jniFN4GEMwLTAUCcoppPLy4xGR0WNZ+WLqDVzbjPEcVPrCZQipyr9F10wxqXCcIrII9ykKvwyLH2R2nf1CQp9y0skuHi91cR4mQ8sql8tWhvJEXEnEsSXul+VT8EehNcdSh/mNFOllqsKxU+1Vqz1AdTOEv50UcCnRq2a3xI3sYbUa94EOFGDFRQfZRjYu6Q9iGHYCP6hkmE7brrvzUaCtQyivVOq+Xw/Drqa1Zm0qxbYfOJUlOIEP6Qj8CTqheC4VmidtyPYgbymVbAhrrp7IPUhqbpb+7XSb4lYS7pjBQP6q7pglr9iqRKTfNd1SMtu3pAwpVi1JGg+TIWTJmuER4hGRulg+pEZxBCgakDl5CHS/hry6bVYQigebCShd7Gu+BUqUgXmO8OPgbzuaCSGFZO6O2rpWKIoIyhrQwPaEypPYFYG7pGutnq+X4R5rupqfEPksgLQs0F3dQjBag81OiDA1wJejh9qhZNjPkabW1TYJdW1YPqYoFnWA7THBkEmGJPromr5djCPBcBEFiBVAqVh0dKMX2b4zXwIC4nYdag6vaMqxxE1WE7nDoKbrHa/nBk0EEwuGcrjIFImrZrvtEBSywXJE5IciOmUMHy5DneUiGNrdxMJtuiHCcFkQqyLLDNuQPvtBACtfZohPoaEfNYChV95xe7OIRQauZgcRZqHv6hlDbu0A2TprAUPWL0EMwksMaZpEGpVqG5SiwbBVa1SgZlkDQ4MxB7TH3WSo4mrGLyg6NU+rhZsM3TgONV9bZkhC0TNENcEQRB7Mzp94ApWLn6CB71aFOAVDVod9A8lJhqjpujWGJUNRXOYzhgH0cYEhIS2zYPgly8OPZ0jK7ZaUIYaxtY5Xcu0I7l9jGNhutenh0FhiiCNTJI2ISRmC3IwimT0Bhma5GQCNWsoQTWF0veV5rQIwxBFwi2YyFMeXYiSwXg92QjCEjYDNc4MGmMyjtdR2Y9M2NzEvwxrqtYKZICByXYZQBrYdD1buWrMEnfVAF/0mRpIhs6D08mbfJopK03ELHYpShjQKgALQSRmyPqh7WXqaMsYVp1eRDAtVKKtmDG3XctriiPmRDLthO4x8G2SYB9USpV6C2E0ZtsH72C0ewl70NqEQwUIVYdEFyBZBhnpvYsNa9Ky6z5OSrKZPI54xRD3QUbPHckwy7PigNk0v9aXNtmFkB3CmPWB1PZNhEEOJ4j6aoabbLGVIY8EwsJA4a1nB0PY3LXAD9QBiYi/COckiSKhgaBSBuz1nmPOEkuldaJUyxEkbbhhQ/QuGrbIPjTOGZbmKWRGof4xK2pwh4V7FfDRDf1NYjdDSpG267fcI8qYbDHkncNs1sSITs4Gvm7B4KwC1ckQWkjIUnpJkWopKpm7YMcmnDBnqCLOawholQ0tERtdCkiFbZqgFdM7Q7oYcs0d7msIpE+YgZDgJp9MpFHwrGAJ9K2EcGhqbHB7b/hQ1fc02xdGvZDgVBtPLymOKi07PEcVyPpWhV4cUoC685oKhH6eehqQHKra0RLPmzbVUt/0iemy0aAcfLW8QiGiBIYMnaVJyk6F8EZWjTREdTvOJaxsOijWz4AjXIn1p3DYK7cXbCpKNlXka0oAEvunl86kdRoGuu400WpSZ5GsbnbZpmPVoyZfC3UfGQxLFccyKwstJhvn0hdpKhgJChpq2Y4HBGhDNaM/fqcWMC4ZV0uxVy0vHtlldlskQ83CnULfAQcmIjwZ1rRbhlCGhJuSr7ilJwt40j5cZ6t3+4xiKsgc5YFV2ypBGSXPQLMfeMsPugiFpQlpSMCJwugWRvxCr1A4aTU9GC37lhRH1IOZFEaSmkmFenNwEQadJ04gPbUV/yZDzaFqsTKFgE2KnkiFLGbpF7zEMdcEwKrm6/94QnibPrd8/Bmbwsd2QecgKGcZd0+8mQsTuVNyDvKsTtN06WKB3tZjmvbrbbvtdpzzLaShpltptvViytdmZ0jxrE3Xg7OgglSEJA9MNavQRmXfPN7tgWRqkJQn2UxnGVhzRfDwVQoXaoub7DY/Z5s6MITCiIJYyeIZ2nKaThMTTBmSszrVDFN4qDprNgeO2C7PMG3onPbvtGuaMYaql145zUF1m3rQZThMiM2+zBwxN857nNLwZhlOwvGp9x3BC0/ClloqSHXMWdXZ80+sPwnCAcRiGzdk3JFicBYNa64EzNznsIRpb1vXpPfFCFyNaFWfr2adDoIfi5LG1YBjowXWGrGuYwFD4KllbmLoLDIulUu2e79l46usIi5JBWHTqm2RxwkTiptWUB7Q8N3ewstPm7x/bgam3NpeXJR3UjQlSreWeU6+fLqmwfNO8aJS/eVKUv3ozvYQK9uEfycnza7b83p1y2P1VZ2o0Et43Yp89gbwGWNpX//orL1LlazduO4SjVIjrrjO6q11uH01BYU1Yy+n8jUHX0GJN4Hw4YXzN3/CgaEg/7/sxTEse/6XJF+HsfPdoSNbqK8jF+eX48nNC4pM/xuPddb5NoHgepDiEHvgzO1P6dMnGh7sHVz/iEg0WUU30AOD0C314wFdsPsSkyez9IjuHVnQI82TFFs+GIDNdIYcTuLxga9MdSuKji2zFk8NdgXF6mT88gN/js/EVpRJNDkezTYhlj8Mhn/e+ufl8sjuanA3Tf7t3cSZn2N29TEelF+mc2Rii9cGRaDG7XgMm59HRbME5Njw7iudLO2RH5Jqz4RfnF+QokxSN/piADCaX6bdPFFRwcpPg8NlkfHCZhV3+aXhBJ7vjuaj5aJd9OhpeLNQiHnPY9dGaZMgvJocHbMYwJ/ZveDDJLgkwZP9/zWgQE7yzBrtDMjk/mqRN6PDscHdyY+f5ZHR0djlTBMFwsvvs0+5MMfhofH4Un41H8xvxJT08H4/W9M8Z+Ch3sWDIL/49GV0czPZTyJCNj656PnbwbHKYzQ5Uye6zYaa05PKcjm4yJKPonE7GaM6QHw6P6HimzXw0yT073MVHSwyHz4aTyzV9hssnZ6PxxeH8SD4aH10czR8KhmfX7IGdnx0ezRjusii6zA0zMUPvFTIku+NPw3iJIbk4ZJPzmZoCw8ujy9HZZP6pUTxmk/F4XVoKtcTlp4uD+X5RdjhZlBOHbPTHp+vaQhifMeQXn56J5p8yhrujo8lNX8ohPBzMtJSMhpyMnv17vm98eH7Gxme78wjIJ+Dp2Gi0Jhmm3zsviQlPFr4C7hO2wqPx4VzmF0JB5/0jOlnBUHw6S2cLhhY8x5fLGQ6BhLPJ4aI9DJfPXazNlcpJln7TW+6vbp962vn1rf+/oeUu12ah0jFzPt/ZdJA/5bfiCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCv91/Ad4adqWlAOB5wAAAABJRU5ErkJggg==", // Replace with a real image URL
  };

  const toggleShowMore = () => setShowMore(!showMore);
  useEffect(() => {
    console.log(bookId, type);
  }, []);
  return (
    <View className="flex-1 bg-white">
      <View className="justify-between flex-row m-5">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <AntDesign name="arrowleft" size={hp(4)} color="black" />
        </TouchableOpacity>
        <Text>{type}</Text>
        <TouchableOpacity>
          <FontAwesome name="shopping-cart" size={hp(4)} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="flex-row gap-3 justify-center items-center m-5">
          <Text style={{ fontSize: hp(2.8), textAlign: "center" }}>
            The Picture of Dorian Gray
          </Text>{" "}
          <TouchableOpacity onPress={() => setWishlist(!wishlist)}>
            {wishlist ? (
              <AntDesign name="hearto" size={hp(3)} color="black" />
            ) : (
              <AntDesign name="heart" size={hp(3)} color="red" />
            )}
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-between">
          <View
            style={{
              height: hp(35),
              width: wp(50),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ZGUwCH_EzbCuDxrzfSECJdl-keVH93HN5A&s",
              }}
              style={{ height: hp(33), width: wp(40), borderRadius: hp(1.4) }}
            />
          </View>
          <View
            style={{
              marginTop: hp(4),
              height: hp(35),
              width: wp(50),
              gap: hp(1.7),
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: hp(1.7) }}>Author:</Text>
            <Text style={{ fontSize: hp(1.7) }}>Rating: </Text>
            <Text style={{ fontSize: hp(1.7) }}>Pricing: </Text>
            <Text style={{ fontSize: hp(1.7) }}>Quality: </Text>

            <TouchableOpacity
              style={{
                height: hp(6),
                width: wp(35),
                backgroundColor: "black",
                borderRadius: hp(1),
                justifyContent: "center",
                marginTop: hp(2),
              }}
            >
              <Text style={{ textAlign: "center", color: "white" }}>
                Add to cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex-1 ml-3 mr-3">
          {/* Book Description */}
          <Text style={{ fontSize: hp(2) }}>
            {/* extract two/three lines from the description here */}
            {!showMore && firstThirtyWords}
          </Text>
          {showMore && <Text style={styles.description}>{description}</Text>}
          <TouchableOpacity onPress={toggleShowMore}>
            <Text style={styles.link}>
              {showMore ? "...Show less" : "...Show more"}
            </Text>
          </TouchableOpacity>
          <Text style={styles.label}>Genres:</Text>
          <View style={styles.genresContainer}>
            {genres.map((genre, index) => (
              <TouchableOpacity>
                <Text key={index} style={styles.genreItem}>
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex-1 justify-center items-center p-5">
          <TouchableOpacity
            onPress={() => setShowShopDetails(!showShopDetails)}
          >
            <Text
              className="font-bold"
              style={{
                fontSize: hp(2),
                marginBottom: hp(2),
              }}
            >
              {showShopDetails ? "Hide Shop Details" : "Shop Details"}{" "}
              {showShopDetails ? (
                <AntDesign name="up" size={hp(2)} color="black" />
              ) : (
                <AntDesign name="down" size={hp(2)} color="black" />
              )}
            </Text>
          </TouchableOpacity>
          {/* Shop Image */}
          {showShopDetails && (
            <>
              {" "}
              <View className="flex-row gap-5 items-center">
                <Image
                  source={{ uri: shopDetails.image }}
                  style={styles.shopImage}
                />

                {/* Shop Name */}
                <TouchableOpacity>
                  {" "}
                  <Text style={styles.shopName}>{shopDetails.name}</Text>
                </TouchableOpacity>

                <Entypo name="chat" size={hp(2.8)} color="#555" />
              </View>
              {/* Shop Address */}
              <Text style={styles.sectionTitle}>Address:</Text>
              <Text style={styles.text}>{shopDetails.address}</Text>
              {/* Contact Information */}
              <Text style={styles.sectionTitle}>Contact:</Text>
              <Text style={styles.text}>{shopDetails.contact}</Text>{" "}
            </>
          )}
        </View>
        <Review />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  description: {
    fontSize: hp(1.8),
    color: "#555",
  },
  link: {
    fontSize: hp(1.7),
    color: "black",
  },

  label: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    color: "#555",
  },
  genresContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Ensures wrapping if content overflows
    gap: hp(1.7), // Adds spacing between genre items
  },
  genreItem: {
    fontSize: hp(1.7),
    color: "black",
    textDecorationLine: "underline",
    marginRight: hp(1),
  },
  shopImage: {
    width: hp(10),
    aspectRatio: 1,
    borderRadius: hp(100),
  },
  shopName: {
    fontSize: hp(2.4),
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  sectionTitle: {
    fontSize: hp(2.2),
    fontWeight: "bold",
    marginTop: hp(1),
    marginBottom: hp(1),
    color: "#555",
  },
  text: {
    fontSize: hp(2),
    color: "#666",
  },
});
