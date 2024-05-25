import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import titles from "../assets/titles_and_ids.json";
import { MoviePoster } from "../components";
import MovieDetails from "../components/MovieDetails";

function SearchScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchValueChange = (e) => {
    setSearch(e);
    const filteredTitles = titles.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredTitles.slice(0, 16));
  };
  return (
    <View className="ios:mt-10 p-3 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">Search</Text>
      <TextInput
        placeholder="Search for films"
        onChangeText={handleSearchValueChange}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex flex-row flex-wrap">
          {search.length > 2
            ? suggestions.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details", { item })}
                    key={index}
                    className="w-1/4 h-36 p-1"
                  >
                    <MoviePoster item={item} />
                  </TouchableOpacity>
                );
              })
            : titles.slice(0, 32).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details", { item })}
                    key={index}
                    className="w-1/4 h-36 p-1"
                  >
                    <MoviePoster item={item} />
                  </TouchableOpacity>
                );
              })}
          <View className="p-12"></View>
        </View>
      </ScrollView>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { item } = route.params;

  return (
    <MovieDetails item={item} navigation={navigation} />
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
        component={DetailsScreen}
      />
    </SearchStack.Navigator>
  );
}
