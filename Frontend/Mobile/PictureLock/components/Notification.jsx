import { Text, View, TouchableOpacity, Image } from "react-native";
import { memo, useState, useEffect } from "react";
import { getProfilePictureUrl, getUser } from "../lib/supabaseUtils";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";
import TimeAgo from "../functions/TimeAgo";

function Notification(props) {
  const navigation = useNavigation();
  const { posts } = useUser();
  const [userID, setUserID] = useState("");
  const [username, setUsername] = useState("");
  const [userpic, setUserpic] = useState("");
  const [item, setItem] = useState(null);

  useEffect(() => {
    const foundPost = posts.find((post) => post.id === props.post_id);
    if (foundPost) {
      setItem(foundPost);
    }
    const fetchUser = async () => {
      const user = await getUser(props.id);
      setUsername(user[0].username);
      setUserID(user[0].id);
    };

    const fetchUserPicture = async () => {
      const pic = await getProfilePictureUrl(props.id);
      setUserpic(pic);
    };

    fetchUser();
    fetchUserPicture();
  }, [props]);

  if (props.status === "like") {
    return (
      <View className="flex flex-row items-center mb-3 max-w-full">
        <View>
          {userpic && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserScreenHome", { userID, userpic })
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
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserScreenHome", { userID, userpic })
            }
          >
            <Text className="dark:text-white text-md font-bold">
              {username}&nbsp;
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("PostDetailsHome", { item })}
          >
            <Text className="dark:text-white text-md">liked your post</Text>
          </TouchableOpacity>
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
              navigation.navigate("UserScreenHome", { userID, userpic })
            }
          >
            <Image source={{ uri: userpic }} className="w-8 h-8 rounded-full" />
          </TouchableOpacity>
        )}
      </View>
      <View className="flex flex-row items-basline ml-2">
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("UserScreenHome", { userID, userpic })
          }
        >
          <Text className="dark:text-white text-md font-bold">
            {username}&nbsp;
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PostDetailsHome", { item })}
        >
          <Text className="dark:text-white text-md ">
            commented on your post
          </Text>
        </TouchableOpacity>
        <Text className="dark:text-white text-xs">
          &nbsp; {TimeAgo(props.date)}
        </Text>
      </View>
    </View>
  );
}

export default memo(Notification);
