import { Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import TimeAgo from "../functions/TimeAgo";
import { memo } from "react";

function Post(props) {
  const numStars = Math.floor(Math.random() * 5) + 1;

  const stars = Array.from({ length: numStars }, (_, index) => (
    <IconButton key={index} icon="star" size={14} />
  ));

  return (
    <View className="w-full mb-3 border-b-[1px] border-black/10 dark:border-white/10 pb-3">
      <View className="flex flex-row space-x-2 w-full">
        <View className="flex w-1/10">
          <Image
            source={{ uri: props.post.author.image }}
            className="w-8 h-8 rounded-md"
          />
        </View>
        <View className="flex-1 w-8/10">
          <View className="flex flex-row justify-between mb-1">
            <View className="flex flex-row">
              <Text className="font-bold dark:text-white">
                {props.post.author.username}
              </Text>
              <Text className="dark:text-white text-xs">
                &nbsp;· {TimeAgo(props.post.createdAt)}
              </Text>
            </View>
            <Entypo name="dots-three-horizontal" size={16} color="gray" />
          </View>
          <View className="flex flex-row w-full justify-between">
            <View className="flex justify-between w-2/3">
              <Text className="dark:text-white text-xs pr-1">
                {props.post.review}
              </Text>
              <View>
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
            <View className="flex flex-row justify-between w-1/3">
              <View className="w-full">
                {props.post.movieURL && (
                  <Image
                    source={{ uri: props.post.movieURL }}
                    className="w-full h-40 rounded-md"
                  />
                )}
                <View className="flex flex-row justify-center mt-2">
                  {stars}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(Post);