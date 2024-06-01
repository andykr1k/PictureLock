import { View, Text, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getUser, getProfilePictureUrl } from "../lib/supabaseUtils";
import { useEffect, useState } from "react";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userID, userpic } = route.params;
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userID);
      setUser(user[0]);
    };

    fetchUser();
  }, [userID]);

  if (!user) {
    return null
  }

  return (
    <View className="ios:mt-10 p-3 space-y-3">
      <Text className="dark:text-white font-bold text-3xl">{user.username}</Text>
      {userpic && (
        <Image source={{ uri: userpic }} className="w-32 h-32 rounded-md" />
      )}
      <Text className="dark:text-white font-bold text-3xl">{user.full_name}</Text>
    </View>
  );
}
