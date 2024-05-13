import React, { useState } from "react";
import {
  View,
  useColorScheme,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Recommendation } from "../functions/Recommendation";

const data = [
  {
    movie: "Friends",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
  },
  {
    movie: "Barbie",
    movieURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  },
  {
    movie: "Game of Thrones",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
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
    movie: "Avatar",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  }
];

function AIScreen({ navigation }) {
  const filmtypes = ["TV Show", "Movie"];
  const platforms = [
    {
      name: "Amazon Prime",
      image: require("../assets/amazon_logo.jpeg"),
    },
    {
      name: "Netflix",
      image: require("../assets/netflix_logo.jpeg"),
    },
    {
      name: "Hulu",
      image: require("../assets/hulu_logo.jpeg"),
    },
    {
      name: "Disney Plus",
      image: require("../assets/disney_logo.jpeg"),
    },
    {
      name: "Paramount Plus",
      image: require("../assets/paramount_logo.jpeg"),
    },
    {
      name: "HBO Max",
      image: require("../assets/hbo_logo.jpeg"),
    },
  ];
  const genres = ["Action", "Drama", "Comedy", "Romance"];
  const [recommends, setRecommends] = useState(null);
  const [movieName, setMovieName] = useState("");
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [selectedGenreIndexes, setSelectedGenreIndexes] = useState([]);
  const [selectedPlatformIndexes, setSelectedPlatformIndexes] = useState([]);

  function recommend() {
    (async () => {
      filmtype = filmtypes[selectedTypeIndex].toUpperCase();
      platforms_string = "";
      for (i = 0; i < selectedPlatformIndexes.length; i++) {
        platforms_string += platforms[selectedPlatformIndexes[i]];
        if (i < selectedPlatformIndexes.length - 1) {
          platforms_string += "-";
        }
      }
      console.log("Film Type: " + filmtype);
      console.log("Film Name: " + movieName);
      console.log("Platform String: " + platforms_string);
      const res = await Recommendation(filmtype, movieName, platforms_string);
      setRecommends(res);
    })();
  }

  return (
    <View className="mt-10 p-5 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">Recommendation</Text>
      <View className="space-y-2">
        <Text h4 className="dark:text-white font-bold text-lg">
          Film Type
        </Text>
        <View className="flex flex-row space-x-2">
          {filmtypes.map((type, index) => (
            <TouchableOpacity key={index}>
              <View className="p-3 rounded-lg dark:bg-dark-btn/20 bg-black/10">
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
        <View className="flex flex-row space-x-2">
          {platforms.map((item, index) => (
            <TouchableOpacity key={index}>
              <View className="rounded-lg">
                <Image
                  source={item.image}
                  className="w-14 h-10 rounded-lg"
                ></Image>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="space-y-2">
        <Text h4 className="dark:text-white font-bold text-lg">
          Genres
        </Text>
        <View className="flex flex-row space-x-2">
          {genres.map((genre, index) => (
            <TouchableOpacity key={index}>
              <View className="p-3 rounded-lg dark:bg-dark-btn/20 bg-black/10">
                <Text className="font-bold dark:text-white">{genre}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View className="space-y-2">
        <Text h4 className="dark:text-white font-bold text-lg">
          Movie
        </Text>
        <View className="flex flex-row flex-wrap">
          {data.map((item, index) => {
            return (
              <TouchableOpacity className="w-1/4 p-1" key={index}>
                <Image
                  source={{ uri: item.movieURL }}
                  className="w-full h-40 rounded-md"
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <TouchableOpacity
        className="dark:bg-dark-btn/20 bg-black/10 p-3 rounded-md"
        onPress={() => recommend()}
      >
        <Text className="font-bold text-center dark:text-white">Recommend</Text>
      </TouchableOpacity>
      {recommends != null && (
        <View>
          <Text>Recommendations</Text>
          {recommends.map((item, index) => (
            <Text key={item}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
}

function DetailsScreen() {
  return (
    <View>
      {recommends != null && (
        <View>
          <Text>
            Recommendations
          </Text>
          {recommends.map((item, index) => (
            <Text h5 key={item}>
              {index + 1}. {item}
            </Text>
          ))}
        </View>
      )}
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
        name="Details"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
    </AIStack.Navigator>
  );
}
