import React from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Image,
  Text,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { logUserOut } from "../redux/slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "../components";

const data = [
  {
    movie: "Friends",
    movieURL:
      "https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg",
  },
  {
    movie: "Barbie",
    movieURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  },
  {
    movie: "Game of Thrones",
    movieURL:
      "https://m.media-amazon.com/images/M/MV5BN2IzYzBiOTQtNGZmMi00NDI5LTgxMzMtN2EzZjA1NjhlOGMxXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_FMjpg_UX1000_.jpg",
  },
  {
    movie: "How I Met Your Mother",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg",
  },
  {
    movie: "Elemental",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    movie: "Heart of Stone",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/vB8o2p4ETnrfiWEgVxHmHWP9yRl.jpg",
  },
  {
    movie: "Flash",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
  },
  {
    movie: "Fast X",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  },
  {
    movie: "The Matrix",
    movieURL:
      "https://static.wikia.nocookie.net/matrix/images/5/56/The_Matrix_digital_release_cover.jpg/revision/latest?cb=20210908111245",
  },
];

function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return (
    <View className="p-5 mt-10">
      <View className="flex flex-row items-center justify-between ">
        <Text className="dark:text-white font-bold text-3xl mb-2">Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <IconButton icon="settings" size={28} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex flex-row items-end">
          <Image
            source={{ uri: user.image }}
            className="w-12 h-12 rounded-xl"
          />
          <View className="ml-2">
            <Text className="dark:text-white font-bold text-md">
              {user.name}
            </Text>
            <View className="flex flex-row space-x-2">
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
              {data.map((item, index) => {
                return (
                  <Image
                    source={{ uri: item.movieURL }}
                    className="w-20 h-32 rounded-md mt-2"
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View className="mt-4">
          <Text className="dark:text-white font-bold text-md">
            Recently Watched Movies & Shows
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row space-x-2">
              {data.map((item, index) => {
                return (
                  <Image
                    source={{ uri: item.movieURL }}
                    className="w-20 h-32 rounded-md mt-2"
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <View className="mt-4">
          <Text className="dark:text-white font-bold text-md">Bookmarks</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex flex-row space-x-2">
              {data.map((item, index) => {
                return (
                  <Image
                    source={{ uri: item.movieURL }}
                    className="w-20 h-32 rounded-md mt-2"
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
        <TouchableOpacity className="w-full bg-orange-fruit mt-4 p-4 rounded-md">
          <Text className="font-bold text-center">Create A New List</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return (
    <ScrollView className="p-3">
      <TouchableOpacity
        onPress={() => dispatch(logUserOut())}
        className="w-full bg-orange-fruit mt-4 p-4 rounded-md"
      >
        <Text className="font-bold text-center">Logout</Text>
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
        headerTitleStyle: { color: "white" },
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
