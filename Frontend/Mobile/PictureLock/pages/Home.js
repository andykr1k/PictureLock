import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  MovieDetails,
  Post,
  CreatePost,
  ProfileScreen,
  IconButton,
  RecordScreen,
  PostDetails,
} from "../components";
import {
  RefreshControl,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import React from "react";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import NotificationStackScreen from "./Notifications";

function HomeScreen() {
  const navigation = useNavigation();
  const animationRef = React.useRef(null);
  const { refreshUserData, posts, following } = useUser();
  const feedtypes = ["For You", "Everyone", "Trending"];
  const feedtypeicons = ["people", "public", "trending-up"];
  const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(0);
  const [filteredPosts, setFilteredPosts] = React.useState([]);
  const tabBarHeight = useBottomTabBarHeight();

  const scrollY = React.useRef(new Animated.Value(0)).current;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [80, 0],
    extrapolate: "clamp",
  });

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

  const handleHorizontalSwipe = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      const { translationX } = nativeEvent;
      if (translationX < -50) {
        // Swiped left
        setSelectedTypeIndex((prevIndex) =>
          prevIndex === feedtypes.length - 1 ? prevIndex : prevIndex + 1
        );
      } else if (translationX > 50) {
        // Swiped right
        setSelectedTypeIndex((prevIndex) =>
          prevIndex === 0 ? prevIndex : prevIndex - 1
        );
      }
    }
  };

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3 h-full">
      <Animated.View
        className="mb-2"
        style={{ height: headerHeight, overflow: "hidden" }}
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="dark:text-white font-bold text-3xl">Home</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationStackScreen")}
          >
            <IconButton icon="notifications-none" size={28} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row space-x-2 mt-1">
          {feedtypes.map((type, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedTypeIndex(index)}
            >
              <View
                className={`p-1 px-2 rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                  selectedTypeIndex === index
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
              >
                <View className="flex-row items-center space-x-2">
                  <IconButton icon={feedtypeicons[index]} size={24} />
                  {selectedTypeIndex === index && (
                    <Text className="font-bold dark:text-white">{type}</Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
      <PanGestureHandler onHandlerStateChange={handleHorizontalSwipe}>
        <FlatList
          className="mb-20 overflow-visible"
          data={selectedTypeIndex === 1 ? posts : filteredPosts}
          renderItem={({ item, index }) => <Post key={index} post={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={() => {
                refresh();
              }}
            />
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}
        />
      </PanGestureHandler>
      <TouchableOpacity
        className="absolute bottom-0 right-0 p-5 mb-28"
        onPress={() => navigation.navigate("Create")}
      >
        <BlurView className="w-12 h-12 rounded-full dark:bg-black/80 flex items-center justify-center overflow-hidden">
          <Text className="dark:text-white font-light text-xl text-orange-fruit align-middle text-center">
            +
          </Text>
        </BlurView>
      </TouchableOpacity>
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
      <HomeStack.Screen
        name="RecordScreen"
        component={RecordScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NotificationStackScreen"
        component={NotificationStackScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PostDetailsHome"
        component={PostDetails}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
