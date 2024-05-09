import { TouchableOpacity, View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Post, Comment } from "../components";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import React from "react";
import CreateRandomFeed from "../functions/CreateRandomFeed";
import LottieView from "lottie-react-native";

function HomeScreen({ navigation }) {
  const animationRef = React.useRef(null);

  const [data, setData] = React.useState(CreateRandomFeed());
  const [refreshing, setRefreshing] = React.useState(false);

  function refresh() {
    animationRef.current?.play();
    setTimeout(() => {
      setData(CreateRandomFeed());
      animationRef.current?.play();
    }, 100);
  }
  return (
    <View className="mt-10 p-5 space-y-2">
      <Text className="dark:text-white font-bold text-3xl">Home</Text>
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
        {data.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Details", { item, index })}
              key={index}
            >
              <Post key={index} post={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function PostDetails({ route, navigation }) {
  const { item, index } = route.params;

  const [text, onChangeText] = React.useState("Comment");

  const comments = item.comments;
  return (
    <View className="p-5 h-full">
      <Post key={index} post={item} />
      <ScrollView className="">
        {comments.map((item, index) => {
          return <Comment key={index} post={item} />;
        })}
      </ScrollView>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: "white" },
      }}
    >
      <HomeStack.Screen
        name="PictureLock"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Details" component={PostDetails} />
    </HomeStack.Navigator>
  );
}
