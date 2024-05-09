import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";

const data = [
  {
    movie: "Friends",
    movieURL:
      "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
  },
  {
    movie: "Barbie",
    movieURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  },
  {
    movie: "Game of Thrones",
    movieURL:
      "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
  },
  {
    movie: "How I Met Your Mother",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg",
  },
  {
    movie: "Elemental",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    movie: "Heart of Stone",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg",
  },
  {
    movie: "Flash",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
  },
  {
    movie: "Fast X",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  },
  {
    movie: "The Matrix",
    movieURL:
      "https://static.wikia.nocookie.net/matrix/images/5/56/The_Matrix_digital_release_cover.jpg/revision/latest?cb=20210908111245",
  },
];

function SearchScreen({ navigation }) {

  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
    setSearch(search);
  };
  return (
    <View className="mt-10 p-5 space-y-2">
      <Text className="dark:text-white font-bold text-3xl">Search</Text>
      <TextInput
        placeholder="Search for friends and films"
        onChangeText={updateSearch}
        className="bg-orange-fruit/20 p-3 dark:text-white font-bold rounded-md"
      ></TextInput>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex flex-row flex-wrap">
          {data.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate("Details", { item, index })}
                key={index}
                className="w-1/4 p-1"
              >
                <Image
                  source={{ uri: item.movieURL }}
                  className="w-full h-48 rounded-md"
                />
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
    <View className=" flex justify-center items-center p-3">
      <Image source={{ uri: item.movieURL }} className="w-40 h-60 rounded-md" />
      <Text className="font-bold text-lg dark:text-white">{item.movie}</Text>
    </View>
  );
}

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: "white" },
      }}
    >
      <SearchStack.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen name="Details" component={DetailsScreen} />
    </SearchStack.Navigator>
  );
}