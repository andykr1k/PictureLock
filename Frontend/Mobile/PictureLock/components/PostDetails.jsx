import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Post from "./Post";

export default function PostDetails() {
  const route = useRoute();
  const { item, section } = route.params;

  return (
    <View className="h-full p-3 flex-1 justify-center">
      <Post post={item} section={section} />
    </View>
  );
}
