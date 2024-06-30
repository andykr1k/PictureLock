import {
  Animated,
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  FlatList,
  Dimensions,
  UIManager,
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
  FollowScreen,
  ListScreen,
} from "../components";
import { RefreshControl } from "react-native-gesture-handler";
import React, { useState, useRef } from "react";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import NotificationStackScreen from "./Notifications";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

function HomeScreen() {
  const navigation = useNavigation();
  const { refreshUserData, posts, following } = useUser();
  const feedtypes = ["For You", "Everyone", "Trending"];
  const feedtypeicons = ["people", "public", "trending-up"];
  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);

  const getFollowingIds = () => {
    if (!Array.isArray(following)) {
      return [];
    }
    return following.map((f) => f.id);
  };

  async function refresh() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await refreshUserData();
      updateFilteredPosts();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  }

  const updateFilteredPosts = () => {
    const followingIds = getFollowingIds();
    setFilteredPosts(
      posts?.filter((post) => followingIds.includes(post.author))
    );
  };

  React.useEffect(() => {
    updateFilteredPosts();
  }, [posts, following]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setSelectedTypeIndex(index);
  };

  return (
    <View className="ios:ios:mt-10 space-y-3 h-full">
      <View>
        <View className="flex flex-row justify-between items-center p-3">
          <Text className="dark:text-white font-bold text-3xl">Home</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("NotificationStackScreenHome")}
          >
            <IconButton icon="notifications-none" size={28} />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row space-x-2 pl-3">
          {feedtypes.map((type, index) => {
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
                      selectedTypeIndex === index ? "#F97316" : "transparent",
                    borderWidth: 2,
                  }}
                >
                  <View className="flex-row items-center space-x-2">
                    <IconButton icon={feedtypeicons[index]} size={24} />
                    {selectedTypeIndex === index && (
                      <Text className="font-bold dark:text-white">{type}</Text>
                    )}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
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
        {filteredPosts && filteredPosts.length > 0 ? (
          <FlatList
            className="mb-28 overflow-visible w-screen p-3 pt-0"
            data={filteredPosts}
            renderItem={({ item, index }) => (
              <Post key={index} post={item} />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={refresh} />
            }
          />
        ) : (
          <View className="flex items-center space-y-3 w-screen p-3">
            <Text className="dark:text-white font-bold">
              Follow people to see posts here!
            </Text>
          </View>
        )}

        <FlatList
          className="mb-28 overflow-visible w-screen p-3 pt-0"
          data={posts}
          renderItem={({ item, index }) => (
            <Post key={index} post={item} />
          )}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refresh} />
          }
        />
        <View className="overflow-visible w-screen">
          <Text className="dark:text-white font-bold text-center">
            Trending coming soon!
          </Text>
        </View>
      </Animated.ScrollView>
      <TouchableOpacity
        className="absolute bottom-0 right-0 p-5 mb-28"
        onPress={() => navigation.navigate("CreateHome")}
      >
        <BlurView className="w-12 h-12 rounded-full dark:bg-black/80 flex items-center justify-center overflow-hidden">
          <Text className="dark:text-white font-light text-xl text-orange-500 align-middle text-center">
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
        headerTintColor: "#F97316",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <HomeStack.Screen
        name="PictureLockHome"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="CreateHome"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="DetailsHome"
        component={MovieDetails}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="UserScreenHome"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="RecordScreenHome"
        component={RecordScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="NotificationStackScreenHome"
        component={NotificationStackScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="PostDetailsHome"
        component={PostDetails}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="FollowScreenHome"
        component={FollowScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="ListScreenHome"
        component={ListScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
