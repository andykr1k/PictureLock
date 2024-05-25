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
  FlatList
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "../components";
import { useUser } from "../lib/UserContext";
import { handleFirstnameUpdate, handleLastnameUpdate, handleLogOut, handleUploadProfilePicture, handleUsernameUpdate, getProfilePictureUrl } from "../lib/supabaseUtils";
import * as ImagePicker from "expo-image-picker";

function ProfileScreen({ navigation }) {
  const { session, user, pic } = useUser();

  return (
    <View className="p-2 ios:mt-10">
      <View className="flex flex-row items-center justify-between">
        <Text className="dark:text-white font-bold text-3xl mb-2">
          {user.username}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <IconButton icon="settings" size={28} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex-1 space-y-2 items-center">
          {pic && (
            <Image
              source={{ uri: pic }}
              style={{ width: 100, height: 100, borderRadius: 50 }}
            />
          )}
          <View className="space-y-1">
            <View className="flex flex-row space-x-1 justify-center">
              <Text className="dark:text-white font-bold text-lg">
                {user.first_name + " " + user.last_name}
              </Text>
            </View>
            <View className="flex flex-row space-x-1 justify-center">
              <Text className="dark:text-white font-bold text-md">
                {session.user.email}
              </Text>
            </View>
            <View className="flex flex-row space-x-2 justify-center">
              <Text className="dark:text-white">Followers: 10</Text>
              <Text className="dark:text-white">Following: 10</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity className="w-full bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md">
          <Text className="font-bold text-center dark:text-white">
            Create A New List
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const { session, user, pic, refreshUserData } = useUser();

  const [first, setFirst] = useState(user.first_name);
  const [last, setLast] = useState(user.last_name);
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
      base64: true
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      setProfileImageBytes(result.assets[0].base64);
    }
  };

  return (
    <View className="p-3 space-y-1 mt-12">
      <Text className="dark:text-white font-bold text-3xl">Settings</Text>
      <ScrollView>
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
            className="w-4/6 bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
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
        <Text className="dark:text-white font-bold text-xl">First Name</Text>
        <View className="flex flex-row w-full justify-between">
          <TextInput
            value={first}
            onChangeText={setFirst}
            className="w-4/6 bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          ></TextInput>
          <TouchableOpacity
            className="w-1/4 bg-black/10 dark:bg-white/10 p-4 rounded-md"
            onPress={() =>
              handleFirstnameUpdate(first, session.user.id, refreshUserData)
            }
          >
            <Text className="font-bold text-center dark:text-white">Save</Text>
          </TouchableOpacity>
        </View>
        <Text className="dark:text-white font-bold text-xl">Last Name</Text>
        <View className="flex flex-row w-full justify-between mb-4">
          <TextInput
            value={last}
            onChangeText={setLast}
            className="w-4/6 bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          ></TextInput>
          <TouchableOpacity
            className="w-1/4 bg-black/10 dark:bg-white/10 p-4 rounded-md"
            onPress={() =>
              handleLastnameUpdate(last, session.user.id, refreshUserData)
            }
          >
            <Text className="font-bold text-center dark:text-white">Save</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
          onPress={handleLogOut}
        >
          <Text className="font-bold text-center dark:text-white">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen({ navigation }) {
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
        component={ProfileScreen}
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
