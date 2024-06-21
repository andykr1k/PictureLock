import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  useColorScheme,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";
import { getProfilePictureUrl, getUsername } from "../lib/supabaseUtils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Conversation } from "../components";

function Chat() {
  const { refreshUserData, following } = useUser();
  const [followingProfiles, setFollowingProfiles] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchFollowingProfiles = async () => {
      const profiles = [];
      const followingArray = Object.values(following);
      for (const user of followingArray) {
        const username = await getUsername(user.id);
        const pic = await getProfilePictureUrl(user.id);
        profiles.push({ username, pic });
      }
      setFollowingProfiles(profiles);
    };

    fetchFollowingProfiles();
  }, [following]);

  async function refresh() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await refreshUserData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  }

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3 h-full">
      <View className="flex flex-row justify-between items-center">
        <Text className="dark:text-white font-bold text-3xl">Chats</Text>
      </View>
      <ScrollView
        className="h-full space-y-3"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refresh();
            }}
          />
        }
      >
        <Text className="dark:text-white font-bold text-xl">Start a chat</Text>
        <ScrollView horizontal>
          {followingProfiles.map((profile, index) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Conversation", { profile });
              }}
              key={index}
              className="flex items-center"
            >
              <Image
                source={{ uri: profile.pic }}
                className="w-16 h-16 rounded-full"
              />
              <Text className="dark:text-white font-bold mt-1">
                {profile.username}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text className="dark:text-white font-bold text-xl">Conversations</Text>
        <View className="p-20"></View>
      </ScrollView>
    </View>
  );
}

const ChatStack = createNativeStackNavigator();

export default function ChatStackScreen() {
  const colorScheme = useColorScheme();
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <ChatStack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ headerShown: false }}
      />
      <ChatStack.Screen
        name="Conversation"
        component={Conversation}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
}
