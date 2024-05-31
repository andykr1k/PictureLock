import {
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  TextInput,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Post } from "../components";
import { RefreshControl } from "react-native-gesture-handler";
import React, { useState } from "react";
import titles from "../assets/titles_and_ids.json";
import { MoviePoster } from "../components";
import IconButton from "../components/IconButton";
import { handleCreatePost } from "../lib/supabaseUtils";
import { useUser } from "../lib/UserContext";
import MovieDetails from "../components/MovieDetails";

function HomeScreen({ navigation }) {
  const animationRef = React.useRef(null);
  const { session, user, pic, refreshUserData, posts } = useUser();

  function refresh() {
    animationRef.current?.play();
    setTimeout(() => {
      refreshUserData();
      animationRef.current?.play();
    }, 100);
  }
  return (
    <View className="ios:ios:mt-10 p-3 space-y-3">
      <View className="flex flex-row justify-between">
        <Text className="dark:text-white font-bold text-3xl">Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Text className="dark:text-white font-bold text-3xl">+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refresh();
            }}
            tintColor={"transparent"}
          />
        }
      >
        {posts &&
          posts.map((item, index) => {
            return <Post key={index} post={item} navigation={navigation} />;
          })}
        <View className="p-12"></View>
      </ScrollView>
    </View>
  );
}

function CreatePost({ navigation }) {
  const { session, refreshUserData } = useUser();

  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [movie, setMovie] = useState("");
  const [movieID, setMovieID] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">Post</Text>
      <TextInput
        placeholder="Search for films"
        onChangeText={handleSearchValueChange}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row">
          {(suggestions !== null) & (search.length > 3)
            ? suggestions.map((item, index) => (
                <TouchableOpacity
                  className="w-1/3 h-36 p-1"
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
                    <MoviePoster item={item} />
                  </View>
                </TouchableOpacity>
              ))
            : titles.slice(0, 8).map((item, index) => (
                <TouchableOpacity
                  className="w-1/3 h-36 p-1"
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
                    <MoviePoster item={item} />
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      </ScrollView>
      <TextInput
        placeholder="Write a review"
        onChangeText={setReview}
        value={review}
        multiline={true}
        blurOnSubmit={true}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <View className="flex flex-row justify-center mt-2">{renderStars()}</View>
      <TouchableOpacity
        onPress={() =>
          handleCreatePost(
            movie,
            movieID,
            moviePoster,
            review,
            stars,
            session.user.id,
            refreshUserData
          )
        }
        className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
      >
        <Text className="font-bold text-center dark:text-white">Post</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { item } = route.params;

  return <MovieDetails item={item} navigation={navigation} />;
}

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  const colorScheme = useColorScheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <HomeStack.Screen
        name="PictureLock"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Create"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
