import React from "react";
import {
  View,
  TouchableOpacity,
  useColorScheme,
  Image,
  Text,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, ProfileTabs } from "../components";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import SettingsScreen from "./Settings";

function Profile() {
  const navigation = useNavigation();

  const { session, user, pic, posts, followers, following } = useUser();

  return (
    <View className="p-3 ios:mt-10">
      <View className="flex flex-row items-center justify-between">
        <Text className="dark:text-white font-bold text-3xl mb-2">
          {user.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <IconButton icon="settings" size={28} />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-around">
        <View className="flex items-center">
          {pic && (
            <Image source={{ uri: pic }} className="w-24 h-24 rounded-full" />
          )}
          <View className="flex flex-row space-x-1 justify-center">
            {/* <Text className="dark:text-white font-bold text-lg">
              {user.full_name}
            </Text> */}
          </View>
        </View>
        <View className="flex flex-row space-x-5 justify-around items-center">
          <View className="items-center">
            <Text className="dark:text-white font-bold">{posts.length}</Text>
            <Text className="dark:text-white font-bold">Posts</Text>
          </View>
          <View className="items-center">
            <Text className="dark:text-white font-bold">
              {followers.length}
            </Text>
            <Text className="dark:text-white font-bold">Followers</Text>
          </View>
          <View className="items-center">
            <Text className="dark:text-white font-bold">
              {following.length}
            </Text>
            <Text className="dark:text-white font-bold">Following</Text>
          </View>
        </View>
      </View>
      <ProfileTabs id={session.user.id} posts={posts} />
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
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}
