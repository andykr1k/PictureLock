import { Text, View, Image, TouchableOpacity } from "react-native";
import TimeAgo from "../functions/TimeAgo";
import { memo, useState, useEffect } from "react";
import {
  getUsername,
  getProfilePictureUrl,
  handleDeleteComment,
} from "../lib/supabaseUtils";
import { useUser } from "../lib/UserContext";
import IconButton from "./IconButton";

function Comment(props) {
  const { session, refreshUserData } = useUser();

  const [username, setUsername] = useState("");
  const [userpic, setUserpic] = useState("");

  const [mine, setMine] = useState(props.post.user_id === session.user.id);

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername(props.post.user_id);
      setUsername(username);
    };

    const fetchUserPicture = async () => {
      const pic = await getProfilePictureUrl(props.post.user_id);
      setUserpic(pic);
    };

    fetchUsername();
    fetchUserPicture();
  }, [props.post]);

  return (
    <View className="flex flex-row justify-between mb-2 max-w-full">
      <View className="flex flex-row items-center">
        {userpic && (
          <Image source={{ uri: userpic }} className="w-8 h-8 rounded-full" />
        )}
        <View className="ml-2">
          <View className="flex flex-row">
            <Text className="dark:text-white text-sm font-bold">
              {username}
            </Text>
            <Text className="dark:text-white text-sm">
              &nbsp; · {TimeAgo(props.post.created_at)}
            </Text>
          </View>
          <Text className="dark:text-white">{props.post.comment}</Text>
        </View>
      </View>
      {mine && (
        <TouchableOpacity
          className="mt-3 mr-1"
          onPress={() => handleDeleteComment(props.post.id, refreshUserData)}
        >
          <IconButton icon="delete" size={14} />
        </TouchableOpacity>
      )}
    </View>
  );
}

export default memo(Comment);
