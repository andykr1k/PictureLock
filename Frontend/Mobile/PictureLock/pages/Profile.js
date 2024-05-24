import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Image,
  Text,
  TextInput,
  Button
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { IconButton } from "../components";
import { useUser } from "../lib/UserContext";
import { supabase } from "../lib/supabase";
import * as ImagePicker from "expo-image-picker";

function ProfileScreen({ navigation }) {
  const { session, user, pic } = useUser();

  return (
    <View className="p-2 ios:mt-10">
      <View className="flex flex-row items-center justify-between ">
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
        <View className="mt-4">
          <Text className="dark:text-white font-bold text-md">
            Favorite Movies & Shows
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row space-x-2">
              {/* {data.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: item.movieURL }}
                    className="w-20 h-32 rounded-md mt-2"
                  />
                );
              })} */}
            </View>
          </ScrollView>
        </View>
        <View className="mt-4">
          <Text className="dark:text-white font-bold text-md">
            Recently Watched Movies & Shows
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row space-x-2">
              {/* {data.map((item, index) => {
                return (
                  <Image
                    key={index}
                    source={{ uri: item.movieURL }}
                    className="w-20 h-32 rounded-md mt-2"
                  />
                );
              })} */}
            </View>
          </ScrollView>
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
  const data = useUser();

  const [first, setFirst] = useState(data.user.first_name);
  const [last, setLast] = useState(data.user.last_name);
  const [username, setUsername] = useState(data.user.username);
  const [profileImage, setProfileImage] = useState(null);
  const [currentProfileImage, setCurrentProfileImage] = useState(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      const url = await getProfilePictureUrl(data.session.user.id);
      setCurrentProfileImage(url);
    };

    fetchProfileImage();
  }, []);

  const getProfilePictureUrl = async (id) => {
    const { publicURL } = await supabase.storage
      .from("profile-pictures")
      .getPublicUrl(id);

    setPic(publicURL);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleUploadProfilePicture = async () => {
    if (profileImage) {
      const response = await fetch(profileImage);
      const blob = await response.blob();
      const file = new File([blob], "profile.jpg", { type: "image/jpeg" });

      const url = await uploadProfilePicture(file);
      if (url) {
        console.log("Profile picture uploaded:", url);
      }
    }
  };

  const uploadProfilePicture = async (file) => {
    const fileName = data.session.user.id;
  
    let { error } = await supabase.storage
      .from("profile-pictures")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  const handleFirstnameUpdate = async () => {
    const { error } = await supabase
      .from("Users")
      .update({ first_name: first })
      .eq("unique_id", data.session.user.id);
    if (error) {
      console.log(error);
    }
  };

  const handleLastnameUpdate = async () => {
    const { error } = await supabase
      .from("Users")
      .update({ last_name: last })
      .eq("unique_id", data.session.user.id);
    if (error) {
      console.log(error);
    }
  };

  const handleUsernameUpdate = async () => {
    const { error } = await supabase
      .from("Users")
      .update({ username: username })
      .eq("unique_id", data.session.user.id);
    if (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView className="p-3 space-y-1">
      <Text className="dark:text-white font-bold text-xl">Profile Picture</Text>
      <View className="flex flex-row w-full justify-between mb-4">
        {currentProfileImage && (
          <Image
            source={{ uri: currentProfileImage }}
            style={{ width: 100, height: 100, borderRadius: 50 }}
          />
        )}
        <Button title="Change Picture" onPress={pickImage} />
        {profileImage && (
          <TouchableOpacity
            className="w-1/4 bg-black/10 dark:bg-white/10 p-4 rounded-md"
            onPress={handleUploadProfilePicture}
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
          onPress={handleUsernameUpdate}
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
          onPress={handleFirstnameUpdate}
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
          onPress={handleLastnameUpdate}
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
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      {/* <ProfileStack.Screen name="Notifications" component={NotificationStackScreen} options={{headerShown: false}}/> */}
    </ProfileStack.Navigator>
  );
}
