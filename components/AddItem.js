import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "@/hooks/authContext";
import * as FileSystem from "expo-file-system";
import { supabase } from "@/supabaseConfig";
import { Buffer } from "buffer";
import Uploading from "@/components/Uploading";
import { useRouter } from "expo-router";
import CONFIG from "@/config";

export default function AddNewItem() {
  const [selectedType, setSelectedType] = useState("Temporary"); // Default selection
  const [bookName, setBookName] = useState("");
  const [genres, setGenres] = useState([]);
  const [preferredBook, setPreferredBook] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState(null);
  const [images, setImages] = useState([]);
  const [img, setImg] = useState([]); // Array of image objects
  const [upload, setUpload] = useState(false);
  const { user } = useAuth();
  const { router } = useRouter();
  const handleAddItem = async () => {
    if (bookName === "" || location === "" || images.length === 0) {
      Alert.alert("Error", "Please fill up all the necessary information (*)");
      return;
    }
    setUpload(true);
    const genresString = genres.join(", ");

    // Upload images to Supabase storage
    try {
      const uploadedImages = await Promise.all(
        img.map(async (image) => {
          const { base64, filePath, contentType } = image;

          // Convert base64 to binary
          const fileData = Buffer.from(base64, "base64");

          // Upload image to Supabase
          const { data, error } = await supabase.storage
            .from("stt-storage") // Replace with your Supabase bucket name
            .upload(filePath, fileData, { contentType });

          if (error) {
            setUpload(false);
            throw new Error(`Failed to upload ${filePath}: ${error.message}`);
          }

          // Construct the public URL for the uploaded image
          const publicURL = supabase.storage
            .from("stt-storage")
            .getPublicUrl(filePath).data.publicUrl;

          return publicURL; // Return the public URL for reference
        })
      );

      // Store URLs in an array
      console.log("Uploaded Images URLs:", uploadedImages);

      // Add the book details after successful upload
      const reqObj = {
        table: "exchange_books",
        data: {
          userId: user?.id,
          exchangeId: `${user?.id}-${bookName}-${new Date().toISOString()}`,
          title: bookName,
          prefGenres: genresString,
          prefBook: preferredBook,
          location: location,
          description: description,
          type: selectedType,
          images: uploadedImages.join(","),
        },
      };

      const response = await fetch(`${CONFIG.url}/data`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqObj),
      });

      if (response.ok) {
        Alert.alert("Successful", "Book added successfully");
      } else {
        const errorText = await response.text();
        setUpload(false);
        throw new Error(errorText);
      }
    } catch (error) {
      setUpload(false);
      Alert.alert("Error", error.message);
    }
    setUpload(false);
    setBookName("");
    setDescription(null);
    setImages([]);
    setGenres([]);
    setPreferredBook(null);
    setLocation("");
  };

  const genreOptions = [
    "Fiction",
    "Non-Fiction",
    "Sci-Fi",
    "Fantasy",
    "Biography",
  ];

  // Function to handle image selection
  const handleAddImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });
    if (!result.canceled) {
      const newImages = await Promise.all(
        result.assets.map(async (img) => {
          const base64 = await FileSystem.readAsStringAsync(img.uri, {
            encoding: "base64",
          });

          const filePath = `exchange_books/${
            user?.id
          }-${bookName}/${new Date().toISOString()}.${
            img.type === "image" ? "jpeg" : "jpg"
          }`;

          const contentType = img.type === "image" ? "image/jpeg" : "image/jpg";

          return {
            uri: img.uri, // Original image URI
            base64, // Base64 encoding
            filePath, // File path for storage
            contentType, // MIME type
          };
        })
      );
      setImages([...images, ...result.assets.map((asset) => asset.uri)]);
      setImg((prevImages) => [...prevImages, ...newImages]);
      console.log(newImages); // Logs detailed information about each image
    }
  };

  // Function to toggle genre selection
  const toggleGenre = (genre) => {
    setGenres((prevGenres) =>
      prevGenres.includes(genre)
        ? prevGenres.filter((g) => g !== genre)
        : [...prevGenres, genre]
    );
  };

  if (upload) {
    return <Uploading />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Add Book</Text>
        </View>

        {/* Book Name Input */}
        <Text style={styles.label}>Book Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter book name"
          value={bookName}
          onChangeText={setBookName}
        />

        {/* Genre Selection */}
        <Text style={styles.label}>Select Preferred Genres (optional)</Text>
        <View style={styles.genreContainer}>
          {genreOptions.map((genre) => (
            <TouchableOpacity
              key={genre}
              style={[
                styles.genreButton,
                genres.includes(genre) && styles.genreSelected,
              ]}
              onPress={() => toggleGenre(genre)}
            >
              <Text
                style={[
                  styles.genreText,
                  genres.includes(genre) && styles.genreTextSelected,
                ]}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* Add Images */}
        <Text style={styles.label}>Add Pictures *</Text>
        <View style={styles.imageContainer}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.image} />
          ))}
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={handleAddImage}
          >
            <Ionicons name="add-circle-outline" size={hp(4)} color="#333" />
          </TouchableOpacity>
        </View>
        {/* Preferred Book Input */}
        <Text style={styles.label}>Preferred Book (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter preferred book"
          value={preferredBook}
          onChangeText={setPreferredBook}
        />

        {/* Location Input */}
        <Text style={styles.label}>Exchange Location *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />

        {/* Description Input */}
        <Text style={styles.label}>Description (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Temporary or Permanent Radio Buttons */}
        <Text style={styles.label}>Type</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedType === "Temporary" && styles.radioSelected,
            ]}
            onPress={() => setSelectedType("Temporary")}
          >
            <View
              style={[
                styles.radioInner,
                selectedType === "Temporary" && styles.radioInnerSelected,
              ]}
            />
          </TouchableOpacity>
          <Text>Temporary</Text>
          <TouchableOpacity
            style={[
              styles.radioButton,
              selectedType === "Permanent" && styles.radioSelected,
            ]}
            onPress={() => setSelectedType("Permanent")}
          >
            <View
              style={[
                styles.radioInner,
                selectedType === "Permanent" && styles.radioInnerSelected,
              ]}
            />
          </TouchableOpacity>
          <Text>Permanent</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddItem} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginVertical: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  addImageButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  genreButton: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  genreSelected: {
    backgroundColor: "#333",
  },
  genreText: {
    color: "#333",
  },
  genreTextSelected: {
    color: "white",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 6,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  radioSelected: {
    borderColor: "#333",
  },
  radioInnerSelected: {
    backgroundColor: "#333",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#666",
  },
  addButton: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
  },
});
