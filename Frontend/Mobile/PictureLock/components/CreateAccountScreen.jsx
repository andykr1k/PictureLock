import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";
import {
  handleUploadProfilePicture,
  handleUsernameUpdate,
  handleNameUpdate,
} from "../lib/supabaseUtils";
import * as ImagePicker from "expo-image-picker";

function CreateAccountScreen() {
  const { session, user, refreshUserData } = useUser();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
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

  const handleSave = async () => {
    if (!name || !username || !profileImage) {
      alert("Please complete all fields.");
      return;
    }
    await handleUploadProfilePicture(
      profileImage,
      profileImageBytes,
      session.user.id,
      refreshUserData
    );
    await handleUsernameUpdate(username, session.user.id, refreshUserData);
    await handleNameUpdate(name, session.user.id, refreshUserData);
    setProfileImage(null);
    setName(null);
    setUsername(null);
    navigation.navigate("HomeTabs");
  };

  return (
    <View className="ios:ios:mt-10 space-y-5 h-full p-3">
      <Text className="dark:text-white font-bold text-3xl">Set Up Account</Text>
      <View className="flex w-full justify-center items-center mb-4">
        {profileImage ? (
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{ uri: profileImage }}
              style={{ width: 200, height: 200, borderRadius: 100 }}
            />
          </TouchableOpacity>
        ) : (
          <View className="w-52 h-52 rounded-full bg-black/10 flex items-center justify-center">
            <Button title="Upload Picture" onPress={pickImage} />
          </View>
        )}
      </View>
      <Text className="dark:text-white font-bold text-xl">Full Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="w-full bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
        placeholder="Full Name"
      />
      <Text className="dark:text-white font-bold text-xl">Username</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        className="w-full bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
        placeholder="Username"
      />
      <TouchableOpacity
        className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md mt-2"
        onPress={handleSave}
      >
        <Text className="font-bold text-center dark:text-white">Set Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateAccountScreen;