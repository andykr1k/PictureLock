import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Image,
  Text,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton, ProfileTabs } from "../components";
import { useUser } from "../lib/UserContext";
import {
  handleLogOut,
  handleUploadProfilePicture,
  handleUsernameUpdate,
  handleNameUpdate,
} from "../lib/supabaseUtils";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

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
            <Text className="dark:text-white font-bold text-lg">
              {user.full_name}
            </Text>
          </View>
        </View>
        <View className="flex flex-row space-x-5 justify-around items-center mt-3">
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

function SettingsScreen() {
  const { session, user, pic, refreshUserData } = useUser();
  const navigation = useNavigation();

  const [name, setName] = useState(user.full_name);
  const [username, setUsername] = useState(user.username);
  const [profileImage, setProfileImage] = useState(null);
  const [currentProfileImage, setCurrentProfileImage] = useState(pic);
  const [profileImageBytes, setProfileImageBytes] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
      base64: true,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setProfileImageBytes(result.assets[0].base64);
    }
  };

  return (
    <View className="p-3 space-y-3 mt-12">
      <Text className="dark:text-white font-bold text-3xl">Settings</Text>
      <ScrollView className="h-full space-y-3">
        <View className="flex w-full justify-center items-center mb-4">
          {currentProfileImage && !profileImage ? (
            <Image
              source={{ uri: currentProfileImage }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          ) : (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          <Button title="Change Picture" onPress={pickImage} />
          {profileImage && (
            <TouchableOpacity
              className="w-1/4 bg-black/10 dark:bg-white/10 p-4 rounded-md"
              onPress={() =>
                handleUploadProfilePicture(
                  profileImage,
                  profileImageBytes,
                  session.user.id,
                  refreshUserData
                )
              }
            >
              <Text className="font-bold text-center dark:text-white">
                Upload
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <Text className="dark:text-white font-bold text-xl">Username</Text>
        <View className="flex flex-row w-full justify-between">
          <TextInput
            value={username}
            onChangeText={setUsername}
            className="w-[73%] bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          ></TextInput>
          <TouchableOpacity
            className="w-1/4 bg-black/10 dark:bg-white/10 p-4 rounded-md"
            onPress={() =>
              handleUsernameUpdate(username, session.user.id, refreshUserData)
            }
          >
            <Text className="font-bold text-center dark:text-white">Save</Text>
          </TouchableOpacity>
        </View>
        <Text className="dark:text-white font-bold text-xl">Full Name</Text>
        <View className="flex flex-row w-full justify-between">
          <TextInput
            value={name}
            onChangeText={setName}
            className="w-[73%] bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          ></TextInput>
          <TouchableOpacity
            className="w-1/4 bg-black/10 dark:bg-white/10 p-4 rounded-md"
            onPress={() =>
              handleNameUpdate(name, session.user.id, refreshUserData)
            }
          >
            <Text className="font-bold text-center dark:text-white">Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md mt-2"
          onPress={handleLogOut}
        >
          <Text className="font-bold text-center dark:text-white">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
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
