import { Text, View, useColorScheme, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import TimeAgo from "../functions/TimeAgo";

export default function Post(props) {
  const numStars = Math.floor(Math.random() * 5) + 1;

  const stars = Array.from({ length: numStars }, (_, index) => (
    <IconButton key={index} icon="star" size={18} />
  ));

  return (
    <View className="border-b-2 border-orange-fruit/10 w-full mb-2 pb-2">
      <View className="flex flex-row items-center justify-between">
        <View className="flex flex-row space-x-2">
          <Image
            source={{ uri: props.post.author.image }}
            className="w-4 h-4 rounded-md"
          />
          <Text className="font-bold dark:text-white">
            {props.post.author.username}
          </Text>
          <Text className="dark:text-white text-xs">
            · {TimeAgo(props.post.createdAt)}
          </Text>
        </View>
        <Entypo name="dots-three-horizontal" size={16} color="gray" />
      </View>
      <View className="flex flex-row mt-2 w-full justify-between">
        <View className="flex justify-between w-4/6">
          <Text className="dark:text-white">{props.post.review}</Text>
          <View className="">
            {props.post.status == "is watching" ? (
              <></>
            ) : (
              <View className="flex flex-row justify-around">
                <IconButton
                  icon="comment"
                  size={14}
                  text={props.post.comments.length}
                />
                <IconButton
                  icon="favorite-outline"
                  size={14}
                  text={props.post.numberOfLikes}
                />
                <IconButton icon="bookmark-outline" size={14} />
                <IconButton icon="ios-share" size={14} />
              </View>
            )}
          </View>
        </View>
        <View className="w-1/4">
          {props.post.movieURL && (
            <Image
              source={{ uri: props.post.movieURL }}
              className="w-full h-32 rounded-md"
            />
          )}
          <View className="flex flex-row justify-center">{stars}</View>
        </View>
      </View>
    </View>
  );
}