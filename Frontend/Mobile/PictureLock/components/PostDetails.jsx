import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import Post from "./Post";
import { memo } from "react";

function PostDetails() {
  const route = useRoute();
  const { item } = route.params;
  
  return (
    <View className="h-full p-3 flex-1 justify-center">
      <Post post={item}/>
    </View>
  );
}

export default memo(PostDetails);