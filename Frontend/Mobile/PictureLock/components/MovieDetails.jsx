import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect, useRef } from "react";
import { memo } from "react";
import MoviePoster from "./MoviePoster";
import GetMovie from "../functions/GetMovie";
import GetSimilarMovies from "../functions/GetSimilarMovies";
import GetProviders from "../functions/GetProviders";
import { useNavigation, useRoute } from "@react-navigation/native";
import Loading from "./Loading";

function MovieDetails() {
  const ref = useRef(null);
  const navigation = useNavigation();
  const route = useRoute();
  const { item, nav } = route.params;
  const [data, setData] = useState(null);
  const [providers, setProviders] = useState(null);
  const [similarMovies, setSimilarMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GetMovie(item);
        const similar = await GetSimilarMovies(item);
        const providers = await GetProviders(item);
        const filteredSimilarMovies = similar.results.filter(
          (movie) => movie.poster_path !== null
        );
        setData(data);
        setSimilarMovies({ ...similar, results: filteredSimilarMovies });
        setProviders(providers);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    ref.current?.scrollTo({
      y: 0,
      animated: true,
    });
    fetchData();
  }, [item]);

  if (!data || !similarMovies || !providers) {
    return <Loading />;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex p-3 space-y-1 mt-12 mx-auto max-w-full"
      ref={ref}
    >
      <View className="flex-row space-x-2">
        <MoviePoster item={data} size={"large"} />
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
            <View className="flex-row flex-wrap">
              {data.genres &&
                data.genres.slice(0, 5).map((genre) => (
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
          </View>
        </View>
      </View>
      {providers.results.US && (
        <View className="">
          <Text className="dark:text-white font-bold text-xl">
            Streaming Services
          </Text>
          {providers.results.US.buy && (
            <View>
              <Text className="dark:text-white font-bold text-lg">Buy</Text>
              <View className="flex-row flex-wrap">
                {providers.results.US.buy.map((provider) => (
                  <View
                    key={provider.provider_name}
                    className="bg-black/10 dark:bg-white/10 p-2 rounded-md m-1 ml-0"
                  >
                    <Text
                      key={provider.provider_name}
                      className="dark:text-white"
                    >
                      {provider.provider_name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {providers.results.US.rent && (
            <View>
              <Text className="dark:text-white font-bold text-lg">Rent</Text>
              <View className="flex-row flex-wrap">
                {providers.results.US.rent.map((provider) => (
                  <View
                    key={provider.provider_name}
                    className="bg-black/10 dark:bg-white/10 p-2 rounded-md m-1 ml-0"
                  >
                    <Text
                      key={provider.provider_name}
                      className="dark:text-white"
                    >
                      {provider.provider_name}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      )}
      <View className="">
        <Text className="dark:text-white font-bold text-xl ">Overview</Text>
        <Text className="dark:text-white ">{data.overview}</Text>
      </View>
      {similarMovies.results && (
        <View className="">
          <Text className="dark:text-white font-bold text-xl">
            Similar Movies
          </Text>
          <View className="flex-row flex-wrap">
            {similarMovies.results.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-1/4 p-1"
                onPress={() => {
                  if (nav) {
                    navigation.navigate(nav, { item, nav });
                  } else {
                    navigation.navigate("Details", {
                      item,
                    });
                  }
                }}
              >
                <MoviePoster item={item} size={"small"} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
      <View className="p-12"></View>
    </ScrollView>
  );
}

export default memo(MovieDetails);
