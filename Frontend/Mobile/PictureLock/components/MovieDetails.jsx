import {
  Text,
  View,
  useColorScheme,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { memo } from "react";
import MoviePoster from "./MoviePoster";
import GetMovie from "../functions/GetMovie";
import GetSimilarMovies from "../functions/GetSimilarMovies";
import GetProviders from "../functions/GetProviders";

function MovieDetails({ item, navigation }) {
  const [data, setData] = useState(null);
  const [providers, setProviders] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetMovie(item);
        const similar = await GetSimilarMovies(item);
        const providers = await GetProviders(item);
        setData(data);
        setSimilarMovies(similar);
        setProviders(providers);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchData();
  }, []);

  if (!data || !similarMovies || !providers) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex p-3 space-y-1 mt-12 mx-auto max-w-full"
    >
      <View className="flex-row space-x-2">
        <View className="w-1/3 h-60">
          <MoviePoster item={data} />
        </View>
        <View className="space-y-1 w-2/3">
          <View>
            <Text className="dark:text-white font-bold text-xl ">
              {data.title}
            </Text>
            <Text className="dark:text-white ">{data.tagline}</Text>
            <Text className="dark:text-white ">
              Released: {data.release_date}
            </Text>
            <Text className="dark:text-white ">
              Runtime: {data.runtime} minutes
            </Text>
          </View>
          <View className="">
            <Text className="dark:text-white font-bold text-xl">Genres</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {data.genres.map((genre) => (
                  <View
                    key={genre.id}
                    className="bg-black/10 dark:bg-white/10 p-2 rounded-md m-1 ml-0"
                  >
                    <Text key={genre.id} className="dark:text-white">
                      {genre.name}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
      <View className="">
        <Text className="dark:text-white font-bold text-xl">
          Streaming Services
        </Text>
        <Text className="dark:text-white font-bold text-lg">Buy</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {providers.results.US.buy.map((provider) => (
              <View
                key={provider.provider_name}
                className="bg-black/10 dark:bg-white/10 p-2 rounded-md m-1 ml-0"
              >
                <Text key={provider.provider_name} className="dark:text-white">
                  {provider.provider_name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
        <Text className="dark:text-white font-bold text-lg">Rent</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex-row">
            {providers.results.US.rent.map((provider) => (
              <View
                key={provider.provider_name}
                className="bg-black/10 dark:bg-white/10 p-2 rounded-md m-1 ml-0"
              >
                <Text key={provider.provider_name} className="dark:text-white">
                  {provider.provider_name}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="">
        <Text className="dark:text-white font-bold text-xl ">Overview</Text>
        <Text className="dark:text-white ">{data.overview}</Text>
      </View>
      <View className="">
        <Text className="dark:text-white font-bold text-xl">
          Similar Movies
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="flex flex-row">
            {similarMovies.results.map((movie) => (
              <TouchableOpacity
                key={movie.id}
                className="w-24 h-36 p-1"
                onPress={() => navigation.navigate("Details", { movie })}
              >
                <MoviePoster item={movie} />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View className="p-12"></View>
    </ScrollView>
  );
}

export default memo(MovieDetails);
