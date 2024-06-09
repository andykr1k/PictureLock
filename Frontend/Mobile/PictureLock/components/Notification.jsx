import { Text, View, useColorScheme, Image } from "react-native";
import { memo, useState, useEffect } from "react";
import { getProfilePictureUrl, getUsername } from "../lib/supabaseUtils";
import TimeAgo from "../functions/TimeAgo";

function Notification(props) {
  const [username, setUsername] = useState("");
  const [userpic, setUserpic] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername(props.id);
      setUsername(username);
    };

    const fetchUserPicture = async () => {
      const pic = await getProfilePictureUrl(props.id);
      setUserpic(pic);
    };

    fetchUsername();
    fetchUserPicture();
  }, [props]);

  return (
    <View className="flex flex-row items-basline mb-3">
      <Image
        className="w-6 h-6 rounded-md"
        source={{
          uri: userpic,
        }}
      />
      <View className="flex ml-2">
        <View className="flex flex-row items-basline max-w-full">
          <Text className="dark:text-white text-md font-bold">{username}</Text>
          <Text className="dark:text-white text-xs">&nbsp; {TimeAgo(props.date)}</Text>
        </View>
        {props.status === "like" ? (
          <Text className="dark:text-white text-md max-w-full">liked your post</Text>
        ) : (
          <Text className="dark:text-white text-md">
            commented "{props.content}"
          </Text>
        )}
      </View>
    </View>
  );
}

export default memo(Notification);
