import React, { useState, memo, useEffect } from "react";
import { View, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useUser } from "../lib/UserContext";
import Post from "./Post";

const ProfileTabs = (props) => {
  const [selectedTab, setSelectedTab] = useState("Posts");
  const [feed, setFeed] = useState(props.posts);
  const [lists, setLists] = useState();
  const [userID, serUserID] = useState(props.id);
  const { session, refreshUserData } = useUser();

  const renderContent = () => {
    switch (selectedTab) {
      case "Posts":
        return (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="max-h-screen"
          >
            <View className="flex items-center">
              {feed &&
                feed.map((item, index) => <Post key={index} post={item} />)}
            </View>
            <View className="p-44"></View>
          </ScrollView>
        );
      case "Lists":
        return (
          <ScrollView className="h-full">
            <View className="flex items-center">
              {userID === session.user.id && (
                <TouchableOpacity className="w-full bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md">
                  <Text className="font-bold text-center dark:text-white">
                    Create A New List
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        );
      case "Badges":
        return (
          <ScrollView className="h-full">
            <View className="flex items-center">
              <Text className="dark:text-white font-bold">
                Show all badges here
              </Text>
            </View>
          </ScrollView>
        );
      default:
        return null;
    }
  };

  return (
    <View className="mt-3">
      <View className="flex flex-row justify-around">
        <TouchableOpacity
          className={`${
            selectedTab === "Posts" ? "border-b-2 border-orange-fruit" : ""
          }`}
          onPress={() => setSelectedTab("Posts")}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Posts" ? "text-orange-fruit" : "dark:text-white"
            }`}
          >
            Posts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            selectedTab === "Lists" ? "border-b-2 border-orange-fruit" : ""
          }`}
          onPress={() => setSelectedTab("Lists")}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Lists" ? "text-orange-fruit" : "dark:text-white"
            }`}
          >
            Lists
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            selectedTab === "Badges" ? "border-b-2 border-orange-fruit" : ""
          }`}
          onPress={() => setSelectedTab("Badges")}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Badges" ? "text-orange-fruit" : "dark:text-white"
            }`}
          >
            Badges
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-3">{renderContent()}</View>
    </View>
  );
};

export default memo(ProfileTabs);
