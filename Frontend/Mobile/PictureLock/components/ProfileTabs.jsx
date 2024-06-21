import React, { useState, memo, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import { getCollections, getCollectionMovies } from "../lib/supabaseUtils";
import List from "./List";

const ProfileTabs = (props) => {
  const [selectedTab, setSelectedTab] = useState("Reviews");
  const [lists, setLists] = useState([]);
  const [userID, setUserID] = useState(props.id);
  const [listMovies, setListMovies] = useState([]);
  const { session } = useUser();
  const navigation = useNavigation();
  const section = props.section;

  useEffect(() => {
    const fetchLists = async () => {
      const data = await getCollections(userID);
      setLists(data);
    };
    fetchLists();
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "Reviews":
        return (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="flex-row flex-wrap">
              {props.posts &&
                props.posts.map((item) => {
                  return (
                    <TouchableOpacity
                      key={item.id}
                      className="w-1/4 h-36 p-1"
                      onPress={() => {
                        if (section === "profilescreen") {
                          navigation.navigate("PostDetailsHome", { item });
                        } else {
                          navigation.navigate("PostDetailsProfile", {
                            item,
                            section,
                          });
                        }
                      }}
                    >
                      <Image
                        source={{ uri: item.movie_poster }}
                        className="w-full h-full rounded-md"
                      />
                    </TouchableOpacity>
                  );
                })}
            </View>
            <View className="p-44"></View>
          </ScrollView>
        );
      case "Collections":
        return (
          <ScrollView className="space-y-3">
            {lists.map((list) => (
              <View key={list.id}>
                <List key={list.id} list_id={list.id} name={list.name} />
              </View>
            ))}
            {userID === session.user.id && (
              <TouchableOpacity
                className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
                onPress={() => {
                  navigation.navigate("CreateList");
                }}
              >
                <Text className="font-bold text-center dark:text-white">
                  Create a Collection
                </Text>
              </TouchableOpacity>
            )}
            <View className="p-40"></View>
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
    <View className="mt-5">
      <View className="flex flex-row justify-around">
        <TouchableOpacity
          className={`${
            selectedTab === "Reviews" ? "border-b-2 border-orange-fruit" : ""
          }`}
          onPress={() => setSelectedTab("Reviews")}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Reviews"
                ? "text-orange-fruit"
                : "dark:text-white"
            }`}
          >
            Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`${
            selectedTab === "Collections"
              ? "border-b-2 border-orange-fruit"
              : ""
          }`}
          onPress={() => setSelectedTab("Collections")}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Collections"
                ? "text-orange-fruit"
                : "dark:text-white"
            }`}
          >
            Collections
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
      <View className="mt-5">{renderContent()}</View>
    </View>
  );
};

export default memo(ProfileTabs);
