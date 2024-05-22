import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  useColorScheme,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import titles from "../assets/titles_and_ids.json";
import { MoviePoster } from "../components";

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
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex flex-row flex-wrap">
          {search.length > 2
            ? suggestions.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Details", { item, index })
                    }
                    key={index}
                    className="w-1/4 p-1"
                  >
                    <MoviePoster item={item} />
                  </TouchableOpacity>
                );
              })
            : titles.slice(0,16).map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Details", { item, index })
                    }
                    key={index}
                    className="w-1/4 p-1"
                  >
                    <MoviePoster item={item} />
                  </TouchableOpacity>
                );
              })}
        </View>
      </ScrollView>
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { item, index } = route.params;

  return (
    <View className="ios:mt-10 flex justify-center items-center p-3 space-y-2">
      <Text className="dark:text-white font-bold text-3xl">{item.title}</Text>
      {/* <Image source={{ uri: item.movieURL }} className="w-60 h-96 rounded-md" /> */}
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
        component={DetailsScreen}
      />
    </SearchStack.Navigator>
  );
}
