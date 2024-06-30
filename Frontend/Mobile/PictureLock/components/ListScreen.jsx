import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { memo, useState, useEffect } from "react";

function ListScreen() {
  const route = useRoute();
  const { listname, movies, userpic, userID } = route.params;
  const navigation = useNavigation();
  const [nav, setNav] = useState();

  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      setNav("DetailsProfile");
    } else if (route.name.includes("Search")) {
      setNav("DetailsSearch");
    } else if (route.name.includes("Home")) {
      setNav("DetailsHome");
    }
  };

  useEffect(() => {
    getRouteName();
  }, [route.name]);

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3 h-full">
      <View className="flex-row space-x-3 items-center">
        {userpic && (
          <Image source={{ uri: userpic }} className="w-10 h-10 rounded-full" />
        )}
        <Text className="dark:text-white font-bold text-3xl">{listname}</Text>
      </View>
      <ScrollView>
        <View className="flex flex-row flex-wrap mt-2">
          {movies?.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-1/4 p-1"
              onPress={() => {
                navigation.navigate(nav, { item });
              }}
            >
              <Image
                key={item.id}
                source={{ uri: item.movie_poster }}
                className="w-full h-36 rounded-md"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default memo(ListScreen);
