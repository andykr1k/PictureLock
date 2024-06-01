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
import { MoviePoster, MovieDetails } from "../components";
import { useNavigation } from "@react-navigation/native";

function SearchScreen() {
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchValueChange = (e) => {
    setSearch(e);
    const filteredTitles = titles.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredTitles.slice(0, 8));
  };

  return (
    <View className="ios:mt-10 p-3 space-y-3 max-w-full">
      <Text className="dark:text-white font-bold text-3xl">Search</Text>
      <TextInput
        placeholder="Search for films"
        onChangeText={handleSearchValueChange}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      ></TextInput>
      <ScrollView showsVerticalScrollIndicator={false} className="flex">
        <View className="flex-row flex-wrap">
          {search.length > 2
            ? suggestions.map((item) => {
                return (
                  <TouchableOpacity
                    className="w-1/4 p-1"
                    key={item.id}
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </TouchableOpacity>
                );
              })
            : titles.slice(0, 20).map((item) => {
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
        <View className="p-12"></View>
      </ScrollView>
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
