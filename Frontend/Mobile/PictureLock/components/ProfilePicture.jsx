import { Image, View, Text } from "react-native";
import { getProfilePictureUrl, getUsername } from "../lib/supabaseUtils";
import { memo, useEffect, useState } from "react";
import Loading from "./Loading";

function ProfilePicture(props) {
  const [pic, setPic] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      setPic(await getProfilePictureUrl(props.id));
      setUsername(await getUsername(props.id));
    };

    fetchUser();
  }, [props.id]);

  if (pic) {
    return (
      <View className="flex items-center">
        <Image
          source={{ uri: pic }}
          className={`w-16 h-16 rounded-full border-2 ${
            props.selectedID === props.id ? "border-orange-500" : "border-transparent"
          }`}
        />
        <Text className="dark:text-white font-bold text-center mt-1">{username}</Text>
      </View>
    );
  }

  return <Loading />;
}

export default memo(ProfilePicture);