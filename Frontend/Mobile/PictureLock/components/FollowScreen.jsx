import React from "react";
import { View, Text, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";
import { RefreshControl } from "react-native-gesture-handler";
import ProfileSearchComponent from "./ProfileSearchComponent";
import * as Haptics from "expo-haptics";

function FollowScreen() {
  const route = useRoute();
  const { followers, following } = route.params;
  const { refreshUserData } = useUser();

  async function refresh() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await refreshUserData("following");
      await refreshUserData("followers");
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  }

  return (
    <View className="ios:ios:mt-10 space-y-5 h-full p-3">
      {followers && (
        <View>
          <Text className="dark:text-white font-bold text-3xl">Followers</Text>
          {followers.length > 0 ? (
            <FlatList
              className="space-y-2 mt-3 h-full"
              data={followers}
              renderItem={({ item, index }) => (
                <View key={item.id} className="mb-2">
                  <ProfileSearchComponent id={item.following} />
                </View>
              )}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={refresh} />
              }
            />
          ) : (
            <Text className="dark:text-white font-bold mt-3">
              No followers yet!
            </Text>
          )}
        </View>
      )}
      {following && (
        <View>
          <Text className="dark:text-white font-bold text-3xl">Following</Text>
          {following.length > 0 ? (
            <FlatList
              className="space-y-2 mt-3 h-full"
              data={following}
              renderItem={({ item, index }) => (
                <View key={item.id} className="mb-2">
                  <ProfileSearchComponent id={item.id} />
                </View>
              )}
              keyExtractor={(item, index) => `${item.id}-${index}`}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={false} onRefresh={refresh} />
              }
            />
          ) : (
            <Text className="dark:text-white font-bold mt-3">
              No following yet!
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

export default FollowScreen;
