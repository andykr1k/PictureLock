import {
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { Switch } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import titles from "../assets/titles_and_ids.json";
import MoviePoster from "../components/MoviePoster";
import IconButton from "../components/IconButton";
import { handleCreatePost } from "../lib/supabaseUtils";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import { SearchMovie } from "../lib/api";

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
  const reviewtypes = ["Write review", "Record review"];
  const feedtypeicons = ["mode-edit", "videocam"];
    const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(0);

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
  };

  useEffect(() => {
    const fetchData = async () => {
      setSuggestions(await SearchMovie(search, 4));
    };
    fetchData();
  }, [search]);

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
      <Text className="dark:text-white font-bold text-xl">Choose a film</Text>
      <TextInput
        placeholder="Search for films"
        onChangeText={handleSearchValueChange}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <View className="flex flex-row flex-wrap">
        {(suggestions !== null) & (search.length > 0)
          ? suggestions.map((item, index) => (
              <TouchableOpacity
                className="w-1/4 p-1"
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
          : titles.slice(0, 4).map((item, index) => (
              <TouchableOpacity
                className="w-1/4 p-1"
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
      <Text className="dark:text-white font-bold text-xl">Review the film</Text>
      <View className="flex flex-row space-x-2 mt-1">
        {reviewtypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTypeIndex(index)}
          >
            <View
              className={`p-1 px-2 rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                selectedTypeIndex === index
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
            >
              <View className="flex-row items-center space-x-2">
                <IconButton icon={feedtypeicons[index]} size={24} />
                {selectedTypeIndex === index && (
                  <Text className="font-bold dark:text-white">{type}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {selectedTypeIndex === 0 ? (
        <TextInput
          placeholder="Write a review"
          onChangeText={setReview}
          value={review}
          multiline={true}
          blurOnSubmit={true}
          className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
        ></TextInput>
      ) : (
        <TouchableOpacity
          className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
        >
          <Text className="font-bold text-center dark:text-white">Record</Text>
        </TouchableOpacity>
      )}

      <Text className="dark:text-white font-bold text-xl">Rate the film</Text>
      <View className="flex flex-row mt-2">{renderStars()}</View>
      <View className="flex flex-row items-center justify-between">
        <Text className="dark:text-white font-bold text-lg">
          Does this review contain a spoiler?
        </Text>
        <Switch onValueChange={setSpoiler} value={spoiler} />
      </View>
      <TouchableOpacity
        onPress={handlePost}
        className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
      >
        <Text className="font-bold text-center dark:text-white">Post</Text>
      </TouchableOpacity>
    </View>
  );
}
