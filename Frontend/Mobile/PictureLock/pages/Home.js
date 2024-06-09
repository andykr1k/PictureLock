import {
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MovieDetails, Post, CreatePost, ProfileScreen } from "../components";
import { RefreshControl } from "react-native-gesture-handler";
import React from "react";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";

function HomeScreen() {
  const navigation = useNavigation();
  const animationRef = React.useRef(null);
  const { refreshUserData, posts, following } = useUser();
  const feedtypes = ["Everyone", "For You"];
  const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(0);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  
  const getFollowingIds = () => {
    if (!Array.isArray(following)) {
      return [];
    }
    return following.map((f) => f.id);
  };

  async function refresh() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    animationRef.current?.play();
    try {
      await refreshUserData();
      const followingIds = getFollowingIds();
      setFilteredPosts(
        posts.filter((post) => followingIds.includes(post.author))
      );
    } catch (error) {
      console.error("Failed to refresh data:", error);
    } finally {
      animationRef.current?.reset();
    }
  }

  React.useEffect(() => {
    const followingIds = getFollowingIds();
    setFilteredPosts(
      posts.filter((post) => followingIds.includes(post.author))
    );
  }, [posts, following]);

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3">
      <View className="flex flex-row justify-between">
        <Text className="dark:text-white font-bold text-3xl">Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Text className="dark:text-white font-bold text-3xl">+</Text>
        </TouchableOpacity>
      </View>
      <View className="flex flex-row space-x-2">
        {feedtypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTypeIndex(index)}
          >
            <View
              className={`p-3 rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                selectedTypeIndex === index
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
            >
              <Text className="font-bold dark:text-white">{type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView
        className="h-full"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refresh();
            }}
          />
        }
      >
        {selectedTypeIndex === 0
          ? posts.map((item, index) => <Post key={index} post={item} />)
          : filteredPosts.map((item, index) => (
              <Post key={index} post={item} />
            ))}
        <View className="p-12"></View>
      </ScrollView>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  const colorScheme = useColorScheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <HomeStack.Screen
        name="PictureLock"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Create"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={MovieDetails}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
