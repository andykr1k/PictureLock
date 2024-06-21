import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { getCollectionMovies } from "../lib/supabaseUtils";
import MoviePoster from "./MoviePoster";

export default function List(props) {
  const [listname, setListname] = useState(props.name);
  const [listid, setListid] = useState(props.list_id);
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const nav = "DetailsProfile";
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getCollectionMovies(listid);
        const modifiedData = data.map((movie) => {
          movie.id = movie.movie_id;
          return movie;
        });
        setMovies(modifiedData);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [listid]);

  return (
    <TouchableOpacity
      onPress={() => {
        if (nav) {
          navigation.navigate("ListScreenProfile", {
            listname,
            movies,
            nav
          });
        } else {
          navigation.navigate("ListScreenHome", {
            listname,
            movies
          });
        }
      }}
      className="w-full bg-black/10 dark:bg-white/10 p-2 rounded-md"
    >
      <Text className="dark:text-white font-bold text-lg">{listname}</Text>
      <View className="flex flex-row flex-wrap mt-2">
        {movies.splice(0, 4).map((item) => (
          <TouchableOpacity
            key={item.id}
            className="w-1/4 p-1"
            onPress={() => {
              navigation.navigate("DetailsProfile", { item, nav });
            }}
          >
            <Image
              key={item.id}
              source={{ uri: item.movie_poster }}
              className="w-full h-36 rounded-md"
            />
          </TouchableOpacity>
        ))}
      </View>
    </TouchableOpacity>
  );
}
