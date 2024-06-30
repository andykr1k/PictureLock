import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Button,
} from "react-native";
import { useUser } from "../lib/UserContext";
import {
  handleLogOut,
  handleUploadProfilePicture,
  handleUsernameUpdate,
  handleNameUpdate,
} from "../lib/supabaseUtils";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function SettingsScreen() {
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
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          ) : (
            <Image
              source={{ uri: profileImage }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          )}
          {!currentProfileImage && !profileImage && (
            <View className="w-52 h-52 rounded-full bg-black/10 flex items-center justify-center">
            </View>
          )}
          {!profileImage && (
            <TouchableOpacity
              onPress={pickImage}
              className="bg-black/10 dark:bg-white/10 p-3 mt-3 rounded-md"
            >
              <Text className="dark:text-white font-bold">Change Picture</Text>
            </TouchableOpacity>
          )}
          {profileImage && (
            <TouchableOpacity
              className="bg-black/10 dark:bg-white/10 p-3 mt-3 rounded-md"
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
