import React, { useState, useEffect, useRef, memo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useUser } from "../lib/UserContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import List from "./List";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const ProfileTabs = ({ id, posts, lists }) => {
  const [selectedTab, setSelectedTab] = useState("Reviews");
  const { session } = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const width = Dimensions.get("window").width;
  const scrollViewRef = useRef(null);
  const borderRef = useRef(null);
  const [nav, setNav] = useState(null);

  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      setNav("PostDetailsProfile");
    } else if (route.name.includes("Search")) {
      setNav("PostDetailsSearch");
    } else if (route.name.includes("Home")) {
      setNav("PostDetailsHome");
    }
  };

  useEffect(() => {
    getRouteName();
  }, [route.name, lists]);

  useEffect(() => {
    if (borderRef.current) {
      switch (selectedTab) {
        case "Reviews":
          animateBorderPosition(0);
          break;
        case "Collections":
          animateBorderPosition(width / 3);
          break;
        case "Badges":
          animateBorderPosition((width * 2) / 3);
          break;
        default:
          break;
      }
    }
  }, [selectedTab, width]);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    switch (index) {
      case 0:
        setSelectedTab("Reviews");
        animateBorderPosition(0);
        break;
      case 1:
        setSelectedTab("Collections");
        animateBorderPosition(width / 3);
        break;
      case 2:
        setSelectedTab("Badges");
        animateBorderPosition((width * 2) / 3);
        break;
      default:
        break;
    }
  };

  const animateBorderPosition = (position) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    borderRef.current.setNativeProps({
      style: { left: position },
    });
  };

  return (
    <View className="mt-5 h-full">
      <View className="flex flex-row justify-around">
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Reviews");
            scrollViewRef.current.scrollTo({ x: 0, animated: true });
          }}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Reviews" ? "text-orange-500" : "dark:text-white"
            }`}
          >
            Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Collections");
            scrollViewRef.current.scrollTo({ x: width, animated: true });
          }}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Collections"
                ? "text-orange-500"
                : "dark:text-white"
            }`}
          >
            Collections
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedTab("Badges");
            scrollViewRef.current.scrollTo({ x: 2 * width, animated: true });
          }}
        >
          <Text
            className={`font-bold ${
              selectedTab === "Badges" ? "text-orange-500" : "dark:text-white"
            }`}
          >
            Badges
          </Text>
        </TouchableOpacity>
        <View
          ref={borderRef}
          style={{
            position: "absolute",
            bottom: -5,
            width: width / 3,
            height: 2,
            backgroundColor: "#F97316",
            borderRadius: 2,
            transitionDuration: "0.25s",
            transitionProperty: "left",
          }}
        />
      </View>
      <ScrollView
        ref={scrollViewRef}
        decelerationRate={"fast"}
        snapToAlignment={"center"}
        snapToInterval={width}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        className="mt-1"
      >
        {posts && posts.length > 0 ? (
          <ScrollView
            className="w-screen p-3"
            contentContainerStyle={{ paddingBottom: 350 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-row flex-wrap">
              {posts.map((item) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    className="w-1/4 h-36 p-1"
                    onPress={() => {
                      navigation.navigate(nav, { item });
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
            <View className="pb-28"></View>
          </ScrollView>
        ) : (
          <View className="flex items-center space-y-3 w-screen p-3">
            <Text className="dark:text-white font-bold">
              User has not reviewed any films.
            </Text>
          </View>
        )}
        {lists && lists.length > 0 ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 350 }}
            showsVerticalScrollIndicator={false}
            className="w-screen p-3 space-y-3"
          >
            {lists.map((list) => (
              <View key={list.id}>
                <List
                  key={list.id}
                  list_id={list.id}
                  name={list.name}
                  user_id={list.user_id}
                  created_at={list.created_at}
                />
              </View>
            ))}
            {id === session.user.id && (
              <TouchableOpacity
                className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
                onPress={() => {
                  navigation.navigate("CreateListProfile");
                }}
              >
                <Text className="font-bold text-center dark:text-white">
                  Create a Collection
                </Text>
              </TouchableOpacity>
            )}
            <View className="pb-64"></View>
          </ScrollView>
        ) : (
          <View className="flex items-center space-y-3 w-screen p-3">
            {id === session.user.id ? (
              <TouchableOpacity
                className="w-full bg-black/10 dark:bg-white/10 p-4 rounded-md"
                onPress={() => {
                  navigation.navigate("CreateListProfile");
                }}
              >
                <Text className="font-bold text-center dark:text-white">
                  Create a Collection
                </Text>
              </TouchableOpacity>
            ) : (
              <Text className="dark:text-white font-bold">
                User has not made any collections.
              </Text>
            )}
          </View>
        )}

        <ScrollView className="w-screen p-3">
          <View className="flex items-center">
            <Text className="dark:text-white font-bold">
              Badges coming soon!
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default memo(ProfileTabs);
