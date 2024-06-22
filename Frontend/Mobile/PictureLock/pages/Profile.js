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
  IconButton,
  PostDetails,
  ProfileTabs,
  MovieDetails,
  ListScreen,
  CreateAccountScreen,
  FollowScreen,
  ProfileScreen,
} from "../components";
import { useUser } from "../lib/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import SettingsScreen from "./Settings";

function Profile() {
  const navigation = useNavigation();
  const [nav, setNav] = useState();
  const route = useRoute();
  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      setNav("UserScreenProfile");
    } else if (route.name.includes("Search")) {
      setNav("UserScreenSearch");
    } else if (route.name.includes("Home")) {
      setNav("UserScreenHome");
    }
  };
  const { session, user, pic, posts, followers, following } = useUser();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (posts && session.user.id) {
      const filtered = posts?.filter((post) => post.author === session.user.id);
      setFilteredPosts(filtered);
    }
    getRouteName();
  }, [posts, session.user.id]);

  return (
    <View className="ios:mt-10">
      <View className="flex flex-row items-center justify-between p-3">
        <Text className="dark:text-white font-bold text-3xl mb-2">
          {user?.username}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SettingsProfile")}
        >
          <IconButton icon="settings" size={28} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => navigation.navigate("SetUpAccount")}>
          <IconButton icon="settings" size={28} />
        </TouchableOpacity> */}
      </View>
      <View className="flex flex-row justify-around mt-3">
        <View className="flex items-center">
          {pic && (
            <Image source={{ uri: pic }} className="w-24 h-24 rounded-full" />
          )}
        </View>
        <View className="flex flex-row space-x-5 justify-around items-center">
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
              navigation.navigate(nav, { followers });
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
              navigation.navigate(nav, { following });
            }}
            className="items-center"
          >
            <Text className="dark:text-white font-bold">
              {following?.length}
            </Text>
            <Text className="dark:text-white font-bold">Following</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-3">
        <ProfileTabs id={session.user.id} posts={filteredPosts} />
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
        headerTintColor: "#FFB54F",
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
        name="SetUpAccountProfile"
        component={CreateAccountScreen}
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
