import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ListScreen() {
  const route = useRoute();
  const { listname, movies } = route.params;
  const navigation = useNavigation();
  const nav = "DetailsProfile";

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3 h-full">
      <Text className="dark:text-white font-bold text-3xl">{listname}</Text>
      <ScrollView>
        <View className="flex flex-row flex-wrap mt-2">
          {movies.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="w-1/4 p-1"
              onPress={() => {
                if (nav) {
                  navigation.navigate("DetailsProfile", { item, nav });
                } else {
                  navigation.navigate("Details", {
                    item,
                  });
                }
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
