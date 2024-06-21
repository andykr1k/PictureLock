import { Image, View, Text } from "react-native";
import { getProfilePictureUrl, getUsername } from "../lib/supabaseUtils";
import { useEffect, useState } from "react";
import Loading from "./Loading";

export default function ProfilePicture(props) {
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
      <View>
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
