import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { MoviePoster, MovieDetails, Loading } from "../components";
import { useNavigation } from "@react-navigation/native";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  SearchMovie,
} from "../lib/api";

function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [topratedLoading, setTopratedLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);

  const handleSearchValueChange = (e) => {
    setSearch(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      setSuggestions(await SearchMovie(search, 10));
    };
    fetchData();
  }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      setUpcoming(await getUpcomingMovies());
      setUpcomingLoading(false);
      setToprated(await getTopRatedMovies());
      setTopratedLoading(false);
      setPopular(await getPopularMovies());
      setPopularLoading(false);
    };
    fetchData();
  }, []);

  return (
    <View className="ios:mt-10 p-3 space-y-3 max-w-full">
      <Text className="dark:text-white font-bold text-3xl">Search</Text>
      <TextInput
        placeholder="Search for films"
        onChangeText={handleSearchValueChange}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      {search.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false} className="flex">
          {suggestions && (
            <View className="flex-row flex-wrap">
              {suggestions.map((item) => {
                return (
                  <TouchableOpacity
                    className="w-1/4 p-1"
                    key={item.id}
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <View className="p-20"></View>
        </ScrollView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} className="flex">
          <Text className="dark:text-white font-bold text-xl">
            Upcoming Movies
          </Text>
          {upcomingLoading ? (
            <Loading />
          ) : (
            <View className="flex-row flex-wrap">
              {upcoming.slice(0, 8).map((item) => {
                return (
                  <TouchableOpacity
                    className="w-1/4 p-1"
                    key={item.id}
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <Text className="dark:text-white font-bold text-xl">
            Top Rated Movies
          </Text>
          {topratedLoading ? (
            <Loading />
          ) : (
            <View className="flex-row flex-wrap">
              {toprated.slice(0, 8).map((item) => {
                return (
                  <TouchableOpacity
                    className="w-1/4 p-1"
                    key={item.id}
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
          <Text className="dark:text-white font-bold text-xl">
            Popular Movies
          </Text>
          {popularLoading ? (
            <Loading />
          ) : (
            <View className="flex-row flex-wrap">
              {popular.slice(0, 8).map((item) => {
                return (
                  <TouchableOpacity
                    className="w-1/4 p-1"
                    key={item.id}
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          <View className="p-20"></View>
        </ScrollView>
      )}
    </View>
  );
}

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
  const colorScheme = useColorScheme();
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        options={{ headerShown: false }}
        name="Details"
        component={MovieDetails}
      />
    </SearchStack.Navigator>
  );
}
