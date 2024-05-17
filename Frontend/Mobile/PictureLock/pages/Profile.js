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
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
  },
  {
    movie: "Barbie",
    movieURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  },
  {
    movie: "Game of Thrones",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
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
    movie: "Avatar",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  },
  {
    movie: "Kingdom of the Planet of the Apes",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
  },
];

function ProfileScreen({ navigation }) {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return (
    <View className="p-2 mt-10">
      <View className="flex flex-row items-center justify-between ">
        <Text className="dark:text-white font-bold text-3xl mb-2">@akrik</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <IconButton icon="settings" size={28} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="h-full">
        <View className="flex-1 space-y-2 items-center">
          <Image
            source={{ uri: user.image }}
            className="w-28 h-28 rounded-full"
          />
          <View className="space-y-1">
            <View className="flex flex-row space-x-1 justify-center">
              <Text className="dark:text-white font-bold text-lg">
                {user.name}
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
              {data.map((item, index) => {
                return (
                  <Image
                    key={index}
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
                    key={index}
                    source={{ uri: item.movieURL }}
                    className="w-20 h-32 rounded-md mt-2"
                  />
                );
              })}
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
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  return (
    <ScrollView className="p-3">
      <TouchableOpacity
        onPress={() => dispatch(logUserOut())}
        className="w-full bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md"
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
        headerTitleStyle: { color: colorScheme === 'dark' ? "white" : "black" },
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
