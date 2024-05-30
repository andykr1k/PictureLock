import { Text, View, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import TimeAgo from "../functions/TimeAgo";
import { memo } from "react";
import { getProfilePictureUrl, getUsername, getComments, getLikes, handleLike, handleUnlike } from "../lib/supabaseUtils";
import { useState, useEffect } from "react";
import { useUser } from "../lib/UserContext";
import { TouchableOpacity } from "react-native-gesture-handler";

function Post(item) {
  const { session, refreshUserData } = useUser();

  const [username, setUsername] = useState("");
  const [userpic, setUserpic] = useState("");
  const [comments, setComments] = useState(null);
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername(item.post.author);
      setUsername(username);
    };

    const fetchUserPicture = async () => {
      const pic = await getProfilePictureUrl(item.post.author);
      setUserpic(pic);
    };

    const fetchComments = async () => {
      const comments = await(getComments(item.post.id));
      setComments(comments);
      item.post.comments = comments;
    }

    const fetchLikes = async () => {
      const likes = await getLikes(item.post.id);
      setLikes(likes);
      item.post.likes = likes;
      setLiked(likes.some(like => like.user_id === session.user.id));
    };

    fetchUsername();
    fetchUserPicture();
    fetchComments();
    fetchLikes();
  }, [item.post]);

  const stars = Array.from({ length: item.post.stars }, (_, index) => (
    <IconButton key={index} icon="star" size={14} />
  ));

  return (
    <View className="w-full mb-3 border-b-[1px] border-black/10 dark:border-white/10 pb-3">
      <View className="flex flex-row space-x-2 w-full">
        <View className="flex w-1/10">
          {userpic && (
            <Image source={{ uri: userpic }} className="w-8 h-8 rounded-md" />
          )}
        </View>
        <View className="flex-1 w-8/10">
          <View className="flex flex-row justify-between mb-1">
            <View className="flex flex-row">
              <Text className="font-bold dark:text-white">{username}</Text>
              <Text className="dark:text-white text-xs">
                &nbsp;· {TimeAgo(item.post.created_at)}
              </Text>
            </View>
            <Entypo name="dots-three-horizontal" size={16} color="gray" />
          </View>
          <View className="flex flex-row w-full justify-between">
            <View className="flex justify-between w-2/3">
              <Text className="dark:text-white text-xs pr-1">
                {item.post.content}
              </Text>
              <View className="flex flex-row justify-around mt-2">
                <IconButton
                  icon="comment"
                  size={14}
                  text={comments && comments.length}
                />
                {liked ? (
                  <TouchableOpacity
                    onPress={() =>
                      handleUnlike(item.post.id, session.user.id, refreshUserData)
                    }
                  >
                    <IconButton
                      icon="favorite"
                      size={14}
                      text={likes && likes.length}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      handleLike(item.post.id, session.user.id, refreshUserData)
                    }
                  >
                    <IconButton
                      icon="favorite-outline"
                      size={14}
                      text={likes && likes.length}
                    />
                  </TouchableOpacity>
                )}
                <IconButton icon="bookmark-outline" size={14} />
                <IconButton icon="ios-share" size={14} />
              </View>
            </View>
            <View className="flex flex-row justify-between w-1/3">
              <View className="w-full">
                {item.post.movie_poster && (
                  <Image
                    source={{ uri: item.post.movie_poster }}
                    className="w-full h-40 rounded-md"
                  />
                )}
                <View className="flex flex-row justify-center mt-3">
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
