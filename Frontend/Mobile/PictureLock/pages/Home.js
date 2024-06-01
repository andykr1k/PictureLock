import {
  TouchableOpacity,
  View,
  Text,
  useColorScheme,
  ScrollView,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MovieDetails, Post, CreatePost, ProfileScreen } from "../components";
import { RefreshControl } from "react-native-gesture-handler";
import React from "react";
import { useUser } from "../lib/UserContext";


function HomeScreen({ navigation }) {
  const animationRef = React.useRef(null);
  const { refreshUserData, posts } = useUser();

  function refresh() {
    animationRef.current?.play();
    setTimeout(() => {
      refreshUserData();
      animationRef.current?.play();
    }, 100);
  }
  return (
    <View className="ios:ios:mt-10 p-3 space-y-3">
      <View className="flex flex-row justify-between">
        <Text className="dark:text-white font-bold text-3xl">Home</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Text className="dark:text-white font-bold text-3xl">+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refresh();
            }}
            tintColor={"transparent"}
          />
        }
      >
        {posts &&
          posts.map((item, index) => {
            return <Post key={index} post={item} navigation={navigation} />;
          })}
        <View className="p-12"></View>
      </ScrollView>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  const colorScheme = useColorScheme();
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <HomeStack.Screen
        name="PictureLock"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Create"
        component={CreatePost}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Details"
        component={MovieDetails}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
