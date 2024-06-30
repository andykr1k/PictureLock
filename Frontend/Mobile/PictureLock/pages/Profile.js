import React, { useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  useColorScheme,
  Image,
  Text,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  CreateList,
  PostDetails,
  ProfileTabs,
  MovieDetails,
  ListScreen,
  FollowScreen,
  ProfileScreen,
} from "../components";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import SettingsScreen from "./Settings";

function Profile() {
  const navigation = useNavigation();
  const { session, user, pic, posts, followers, following, lists } = useUser();
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [textPosts, setTextPosts] = useState([]);
  const [moviePosts, setMoviePosts] = useState([]);

  useEffect(() => {
    if (posts && session.user.id) {
      const filtered = posts?.filter((post) => post.author === session.user.id);
      setFilteredPosts(filtered);
      const textPostsFiltered = filtered.filter((post) => !post.movie_poster);
      setTextPosts(textPostsFiltered);
      const moviePostsFiltered = filtered.filter((post) => post.movie_poster);
      setMoviePosts(moviePostsFiltered);
    }
  }, [posts, session.user.id]);

  return (
    <View className="ios:mt-16 items-center">
      <View className="flex items-center justify-center">
        <View className="flex items-center">
          {pic ? (
            <Image source={{ uri: pic }} className="w-24 h-24 rounded-full" />
          ) : (
            <View className="w-24 h-24 rounded-full bg-black/10 flex items-center justify-center"></View>
          )}
        </View>
        {user && (
          <Text className="dark:text-white font-bold text-2xl p-3">
            @{user.username}
          </Text>
        )}
        <View className="flex-row justify-center space-x-10">
          <View className="items-center">
            {filteredPosts && (
              <Text className="dark:text-white font-bold">
                {filteredPosts?.length}
              </Text>
            )}
            <Text className="dark:text-white font-bold">Posts</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FollowScreenProfile", { followers });
            }}
            className="items-center"
          >
            <Text className="dark:text-white font-bold">
              {followers?.length}
            </Text>
            <Text className="dark:text-white font-bold">Followers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("FollowScreenProfile", { following });
            }}
            className="items-center"
          >
            <Text className="dark:text-white font-bold">
              {following?.length}
            </Text>
            <Text className="dark:text-white font-bold">Following</Text>
          </TouchableOpacity>
          <TouchableOpacity className="items-center">
            <Text className="dark:text-white font-bold">0</Text>
            <Text className="dark:text-white font-bold">Badges</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("SettingsProfile")}
        className="bg-black/10 dark:bg-white/10 mt-4 p-2 rounded-md flex items-center w-1/2 justify-center"
      >
        <Text className="dark:text-white font-bold">Settings</Text>
      </TouchableOpacity>
      <View>
        <ProfileTabs id={session.user.id} textPosts={textPosts} moviePosts={moviePosts} lists={lists} />
      </View>
    </View>
  );
}

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  const colorScheme = useColorScheme();

  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerTintColor: "#F97316",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="SettingsProfile"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="PostDetailsProfile"
        component={PostDetails}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="CreateListProfile"
        component={CreateList}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="DetailsProfile"
        component={MovieDetails}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ListScreenProfile"
        component={ListScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="FollowScreenProfile"
        component={FollowScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="UserScreenProfile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}
