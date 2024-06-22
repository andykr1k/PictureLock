import { Image, View, Text } from "react-native";
import { getProfilePictureUrl, getUser } from "../lib/supabaseUtils";
import { memo, useEffect, useState } from "react";
import Loading from "./Loading";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function ProfileSearchComponent(props) {
  const navigation = useNavigation();
  const userID = props.id;
  const [userpic, setUserpic] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      setUserpic(await getProfilePictureUrl(userID));
      const users = await getUser(userID);
      setUser(users[0]);
    };

    fetchUser();
  }, [userID]);

  if (userpic && user)
    return (
      <TouchableOpacity
        className="p-3 bg-black/10 dark:bg-white/10 rounded-md"
        onPress={() =>
          navigation.navigate("ProfileScreenSearch", { userID, userpic })
        }
      >
        <View className="flex-row space-x-3">
          <Image source={{ uri: userpic }} className="w-8 h-8 rounded-full" />

          <View className="flex-row">
            <Text className="dark:text-white font-bold text-xl">
              {user.username}
            </Text>
            {/* <Text className="dark:text-white text-sm">{user.full_name}</Text> */}
          </View>
        </View>
      </TouchableOpacity>
    );

  return (
    <View className="flex-row space-x-3">
      <Loading />
    </View>
  );
}

export default memo(ProfileSearchComponent);