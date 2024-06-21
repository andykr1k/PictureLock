import { Text, View, TouchableOpacity, Image } from "react-native";
import { memo, useState, useEffect } from "react";
import { getProfilePictureUrl, getUsername } from "../lib/supabaseUtils";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";
import TimeAgo from "../functions/TimeAgo";

function Notification(props) {
  const navigation = useNavigation();

  const { session, refreshUserData } = useUser();

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

  if (props.status === "like") {
    return (
      <View className="flex flex-row items-basline mb-3 max-w-full">
        <View>
          {userpic && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ProfileScreen", { userID, userpic })
              }
            >
              <Image
                source={{ uri: userpic }}
                className="w-8 h-8 rounded-full"
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="flex flex-row items-basline ml-2">
          <Text className="dark:text-white text-md font-bold">
            {username}&nbsp;
          </Text>
          <Text className="dark:text-white text-md">liked your post</Text>
          <Text className="dark:text-white text-xs">
            &nbsp; {TimeAgo(props.date)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center mb-3 max-w-full">
      <View>
        {userpic && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ProfileScreen", { userID, userpic })
            }
          >
            <Image source={{ uri: userpic }} className="w-8 h-8 rounded-full" />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex flex-row items-basline ml-2">
        <Text className="dark:text-white text-md font-bold">
          {username}&nbsp;
        </Text>
        {/* <Text className="dark:text-white text-md ">
          commented "{props.content}"
        </Text> */}
        <Text className="dark:text-white text-md ">
          commented on your post
        </Text>
        <Text className="dark:text-white text-xs">
          &nbsp; {TimeAgo(props.date)}
        </Text>
      </View>
    </View>
  );
}

export default memo(Notification);
