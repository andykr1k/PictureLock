import React, { useState } from "react";
import {
  View,
  useColorScheme,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
  TextInput,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recommend from "../functions/Recommendation";
import GetMovieDetails from "../functions/GetMovieDetails";
import titles from "../assets/titles_and_ids.json";
import { MoviePoster } from "../components";

function AIScreen({ navigation }) {
  const filmtypes = ["TV Show", "Movie"];
  const platforms = [
    {
      name: "Amazon Prime",
      image: require("../assets/amazon_logo.png"),
    },
    {
      name: "Netflix",
      image: require("../assets/netflix_logo.png"),
    },
    {
      name: "Hulu",
      image: require("../assets/hulu_logo.png"),
    },
    {
      name: "Disney Plus",
      image: require("../assets/disney_logo.png"),
    },
    {
      name: "Paramount Plus",
      image: require("../assets/paramount_logo.png"),
    },
    {
      name: "HBO Max",
      image: require("../assets/hbo_logo.png"),
    },
  ];
  const genres = ["Action", "Drama", "Comedy", "Romance", "Thriller", "Horror"];
  const [recommends, setRecommends] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedGenreIndexes, setSelectedGenreIndexes] = useState([]);
  const [selectedPlatformIndexes, setSelectedPlatformIndexes] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const togglePlatformSelection = (index) => {
    setSelectedPlatformIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  const toggleGenreSelection = (index) => {
    setSelectedGenreIndexes((prevIndexes) => {
      if (prevIndexes.includes(index)) {
        return prevIndexes.filter((i) => i !== index);
      } else {
        return [...prevIndexes, index];
      }
    });
  };

  const handleRecommendation = async () => {
    try {
      genre = "Drama";
      const recommendationsData = await Recommend(movieName, genre);
      if (recommendationsData !== null) {
        await setRecommendations(recommendationsData);
        const movieDetails = await GetMovieDetails(recommendationsData);
        if (movieDetails !== null) {
          await setMovies(movieDetails);
        }
      }
      await navigation.navigate("Recommendations", { movies, recommendations });
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleSearchValueChange = (e) => {
    setSearch(e);
    const filteredTitles = titles.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredTitles.slice(0, 8));
  };

  const handleMovieNameChange = async (e) => {
    try {
      await setRecommendations([]);
      await setMovies([]);
      await setMovieName(e);
    } catch (error) {
      console.error("Error handling movie name change:", error);
    }
  };

  return (
    <View className="ios:mt-10 p-3 space-y-3 w-full h-full">
      <Text className="dark:text-white font-bold text-3xl">The Slate</Text>
      <ScrollView>
        <View className="space-y-2">
          <Text h4 className="dark:text-white font-bold text-lg">
            Film Type
          </Text>
          <View className="flex flex-row space-x-2">
            {filmtypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedTypeIndex(index)}
              >
                <View
                  className={`p-3 rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                    selectedTypeIndex === index
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <Text className="font-bold dark:text-white">{type}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="space-y-2">
          <Text h4 className="dark:text-white font-bold text-lg">
            Streaming Services
          </Text>
          <ScrollView
            className="space-x-2"
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {platforms.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => togglePlatformSelection(index)}
              >
                <View
                  className={`rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                    selectedPlatformIndexes.includes(index)
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    source={item.image}
                    className="object-cover w-20 h-10 rounded-xl"
                  ></Image>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View className="space-y-2">
          <Text h4 className="dark:text-white font-bold text-lg">
            Genres
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row space-x-2">
              {genres.map((genre, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => toggleGenreSelection(index)}
                >
                  <View
                    className={`p-3 rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                      selectedGenreIndexes.includes(index)
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <Text className="font-bold dark:text-white">{genre}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
        <View className="space-y-2">
          <Text h4 className="dark:text-white font-bold text-lg">
            Film
          </Text>
          <TextInput
            placeholder="Search for films"
            className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
            onChangeText={handleSearchValueChange}
          ></TextInput>
          <View className="flex flex-row flex-wrap">
            {(suggestions !== null) & (search.length > 3)
              ? suggestions.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleMovieNameChange(item.title)}
                  >
                    <View
                      className={`border-2 rounded-md ${
                        movieName === item.title
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                    >
                      <MoviePoster item={item} size={"small"} />
                    </View>
                  </TouchableOpacity>
                ))
              : titles.slice(0, 8).map((movie, index) => (
                  <TouchableOpacity
                    className="w-1/4"
                    key={index}
                    onPress={() => handleMovieNameChange(movie.title)}
                  >
                    <View
                      className={`border-2 rounded-md ${
                        movieName === movie.title
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                    >
                      <MoviePoster item={movie} size={"small"} />
                    </View>
                  </TouchableOpacity>
                ))}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className="absolute bottom-0 left-0 right-0 mb-32 mx-4 bg-black/10 dark:bg-white/10 p-3 rounded-2xl"
        onPress={handleRecommendation}
      >
        <Text className="font-bold text-center dark:text-white">Recommend</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { movies, recommendations } = route.params;

  return (
    <View className="p-3 ios:mt-10">
      <Text className="dark:text-white font-bold text-3xl mb-2">
        Recommendations
      </Text>
      <View>
        {movies && movies.length !== 0 ? (
          <View className="flex flex-row flex-wrap">
            {movies.map((item, index) => (
              <View className="w-1/4 p-1" key={index}>
                <Image
                  source={{ uri: item }}
                  className="w-full h-40 rounded-md"
                />
              </View>
            ))}
          </View>
        ) : (
          <View>
            <Text className="text-white text-sm">
              Oops...we haven't trained on that movie yet. Try another one!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const AIStack = createNativeStackNavigator();

export default function AIStackScreen() {
  return (
    <AIStack.Navigator>
      <AIStack.Screen
        name="PictureLock"
        component={AIScreen}
        options={{ headerShown: false }}
      />
      <AIStack.Screen
        name="Recommendations"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </AIStack.Navigator>
  );
}
