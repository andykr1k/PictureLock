import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SearchMovie } from "../lib/api";
import { useState, useEffect, memo } from "react";
import titles from "../assets/titles_and_ids.json";
import MoviePoster from "./MoviePoster";
import {
  handleAddMovieToCollection,
  handleCreateList,
} from "../lib/supabaseUtils";
import { useUser } from "../lib/UserContext";
import Loading from "./Loading";

function CreateList() {
  const { session, refreshUserData } = useUser();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [name, setName] = useState("");
  const [selectedMovies, setSelectedMovies] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setSuggestions(await SearchMovie(search, 12));
    };
    fetchData();
  }, [search]);

  const handleMovie = (movie) => {
    const index = selectedMovies.findIndex(
      (selectedMovie) => selectedMovie.id === movie.id
    );
    if (index !== -1) {
      setSelectedMovies(
        selectedMovies?.filter((selectedMovie, i) => i !== index)
      );
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

  const handleCreate = async () => {
    await setLoading(true)
    const list = await handleCreateList(name, session.user.id, refreshUserData);
    for (const movie of selectedMovies) {
      await handleAddMovieToCollection(
        list.id,
        movie.poster,
        movie.title,
        movie.id,
        refreshUserData
      );
    }
    navigation.navigate("Profile");
    await setLoading(false)
  };

  if (loading){
    return <Loading/>;
  }

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3 h-full">
      <Text className="dark:text-white font-bold text-3xl">
        Create Collection
      </Text>
      <TextInput
        placeholder="Collection Name"
        onChangeText={setName}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      />
        {selectedMovies && selectedMovies.length > 0 && (
          <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {selectedMovies.map((selectedMovie) => (
                <TouchableOpacity
                  key={selectedMovie.id}
                  onPress={() => handleMovie(selectedMovie)}
                  className="p-1"
                >
                  <View className="border-2 rounded-md border-orange-500">
                    <MoviePoster item={selectedMovie} size={"xs"} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          </View>
        )}
      <TextInput
        placeholder="Search for films"
        onChangeText={setSearch}
        className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
      />
      <ScrollView>
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
                      selectedMovies.find((movie) => movie.id === item.id)
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </View>
                </TouchableOpacity>
              ))
            : titles.slice(0, 12).map((item, index) => (
                <TouchableOpacity
                  className="w-1/4 p-1"
                  key={index}
                  onPress={() => handleMovie(item)}
                >
                  <View
                    className={`border-2 rounded-md ${
                      selectedMovies.find((movie) => movie.id === item.id)
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <MoviePoster item={item} size={"small"} />
                  </View>
                </TouchableOpacity>
              ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleCreate}
        className="absolute mb-32 bottom-0 left-0 right-0 mx-4 bg-black/10 dark:bg-white/10 p-3 rounded-2xl"
      >
        <Text className="font-bold text-center dark:text-white">
          Create Collection
        </Text>
      </TouchableOpacity>
    </View>
  );
}


export default memo(CreateList);