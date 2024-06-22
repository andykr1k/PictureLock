import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  useColorScheme,
  Animated,
  ScrollView,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useRef, useEffect } from "react";
import {
  MoviePoster,
  MovieDetails,
  Loading,
  ProfileSearchComponent,
  ProfileScreen,
} from "../components";
import { useNavigation } from "@react-navigation/native";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  SearchMovie,
} from "../lib/api";
import { useUser } from "../lib/UserContext";
import { getFriends } from "../lib/supabaseUtils";
import { IconButton } from "../components";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function SearchScreen() {
  const { session } = useUser();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [popular, setPopular] = useState([]);
  const [toprated, setToprated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popularLoading, setPopularLoading] = useState(true);
  const [topratedLoading, setTopratedLoading] = useState(true);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const searchtypes = ["Films", "People"];
  const searchtypeicons = ["local-movies", "people"];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [friendsearch, setFriendsearch] = useState("");
  const [friends, setFriends] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);

  const handleSearchValueChange = (e) => {
    setSearch(e);
  };

  useEffect(() => {
    const fetchFriends = async () => {
      setFriends(await getFriends(friendsearch, session.user.id));
    };

    fetchFriends();
  }, [friendsearch]);

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

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setSelectedTypeIndex(index);
  };

  return (
    <View className="ios:mt-10 space-y-3 max-w-full">
      <Text className="dark:text-white font-bold text-3xl p-3 pb-0">
        Search
      </Text>
      <View className="flex flex-row space-x-2 pl-3">
        {searchtypes.map((type, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1, 0.8],
            extrapolate: "clamp",
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.5, 1, 0.5],
            extrapolate: "clamp",
          });

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedTypeIndex(index);
                scrollViewRef.current.scrollTo({
                  x: index * width,
                  animated: true,
                });
              }}
            >
              <Animated.View
                style={{
                  transform: [{ scale }],
                  opacity,
                  paddingVertical: 4,
                  paddingHorizontal: 8,
                  borderRadius: 20,
                  borderColor:
                    selectedTypeIndex === index ? "#FFB54F" : "transparent",
                  borderWidth: 2,
                }}
              >
                <View className="flex-row items-center space-x-2">
                  <IconButton icon={searchtypeicons[index]} size={24} />
                  {selectedTypeIndex === index && (
                    <Text className="font-bold dark:text-white">{type}</Text>
                  )}
                </View>
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Animated.ScrollView
        ref={scrollViewRef}
        decelerationRate={"fast"}
        snapToAlignment={"center"}
        snapToInterval={width}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
        scrollEventThrottle={16}
      >
        <View className="w-screen p-3 pt-0">
          <TextInput
            placeholder="Search for films"
            onChangeText={handleSearchValueChange}
            className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          />
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              className="flex space-y-2 mt-3"
            >
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
              <View className="p-40"></View>
            </ScrollView>
          )}
        </View>
        <View className="w-screen p-3 pt-0">
          <TextInput
            placeholder="Search for friends"
            value={friendsearch}
            onChangeText={setFriendsearch}
            className="text-white bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md"
          />
          <ScrollView
            className="space-y-2 mt-3 h-full"
            showsVerticalScrollIndicator={false}
          >
            {friends &&
              friends.map((item, index) => (
                <View key={item.id}>
                  <ProfileSearchComponent id={item.id} />
                </View>
              ))}
            <View className="mb-40"></View>
          </ScrollView>
        </View>
      </Animated.ScrollView>
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
        headerStyle: {
          backgroundColor: colorScheme === "dark" ? "#1c1c1c" : "white",
        },
      }}
    >
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen
        name="ProfileScreenSearch"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <SearchStack.Screen name="Details" component={MovieDetails} />
    </SearchStack.Navigator>
  );
}
