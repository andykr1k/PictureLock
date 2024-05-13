import { Text, View, useColorScheme, Image } from "react-native";
import TimeAgo from "../functions/TimeAgo";
import { memo } from "react";

function Comment(props) {
  const colorScheme = useColorScheme();

  return (
    <View className="flex flex-row mt-2 items-center">
      <Image
        source={{ uri: props.post.author.image }}
        className="w-8 h-8 rounded-xl"
      />
      <View className="ml-2">
        <View className="flex flex-row">
          <Text className="dark:text-white text-sm font-bold">
            {props.post.author.username}
          </Text>
          <Text className="dark:text-white text-sm">
            &nbsp; · {TimeAgo(props.post.createdAt)}
          </Text>
        </View>
        <Text className="dark:text-white">
          {props.post.content}
        </Text>
      </View>
    </View>
  );
}

export default memo(Comment);