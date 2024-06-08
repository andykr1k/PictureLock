import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import React, { useState } from "react";
import titles from "../assets/titles_and_ids.json";
import MoviePoster from "../components/MoviePoster";
import IconButton from "../components/IconButton";
import { handleCreatePost } from "../lib/supabaseUtils";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";

export default function CreatePost() {
  const navigation = useNavigation();
  const { session, refreshUserData } = useUser();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [movie, setMovie] = useState("");
  const [movieID, setMovieID] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [spoiler, setSpoiler] = useState(false);

  const handleStarPress = (rating) => {
    setStars(rating);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => (
      <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
        <IconButton
          key={index}
          icon="star"
          size={42}
          color={index < stars ? "gold" : "gray"}
        />
      </TouchableOpacity>
    ));
  };

  const handleSearchValueChange = (e) => {
    setSearch(e);
    const filteredTitles = titles.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredTitles.slice(0, 8));
  };

  const handleMovie = (e) => {
    setMovie(e.title);
    setMovieID(e.id);
    setMoviePoster(e.poster);
  };

  const handlePost = async() => {
    await handleCreatePost(
      movie,
      movieID,
      moviePoster,
      review,
      stars,
      session.user.id,
      refreshUserData,
      spoiler
    );
    navigation.navigate("PictureLock");
  };

  return (
    <View className="ios:mt-10 p-3 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">Post</Text>
      <TextInput
        placeholder="Search for films"
        onChangeText={handleSearchValueChange}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <View className="flex flex-row flex-wrap">
        {(suggestions !== null) & (search.length > 3)
          ? suggestions.map((item, index) => (
              <TouchableOpacity
                className="w-1/4"
                key={index}
                onPress={() => handleMovie(item)}
              >
                <View
                  className={`border-2 rounded-md ${
                    movie === item.title
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <MoviePoster item={item} size={"small"} />
                </View>
              </TouchableOpacity>
            ))
          : titles.slice(0, 8).map((item, index) => (
              <TouchableOpacity
                className="w-1/4"
                key={index}
                onPress={() => handleMovie(item)}
              >
                <View
                  className={`border-2 rounded-md ${
                    movie === item.title
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <MoviePoster item={item} size={"small"} />
                </View>
              </TouchableOpacity>
            ))}
      </View>
      <TextInput
        placeholder="Write a review"
        onChangeText={setReview}
        value={review}
        multiline={true}
        blurOnSubmit={true}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <View className="flex flex-row items-center">
        <Switch onValueChange={setSpoiler} value={spoiler} />
        <Text className="dark:text-white/50 font-bold ml-3">
          Does this contain a spoiler?
        </Text>
      </View>
      <View className="flex flex-row justify-center mt-2">{renderStars()}</View>
      <TouchableOpacity
        onPress={handlePost}
        className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
      >
        <Text className="font-bold text-center dark:text-white">Post</Text>
      </TouchableOpacity>
    </View>
  );
}
