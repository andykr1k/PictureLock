import { Image, View, Text, TouchableOpacity } from "react-native";
import {
  getProfilePictureUrl,
  getUser,
  handleFollow,
  handleUnfollow,
} from "../lib/supabaseUtils";
import { memo, useEffect, useState } from "react";
import Loading from "./Loading";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";

function ProfileSearchComponent(props) {
  const { session, following, refreshUserData } = useUser();
  const navigation = useNavigation();
  const userID = props.id;
  const route = useRoute();
  const [userpic, setUserpic] = useState();
  const [user, setUser] = useState();
  const [nav, setNav] = useState();
  const [followed, setFollowed] = useState();

  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      setNav("UserScreenProfile");
    } else if (route.name.includes("Search")) {
      setNav("UserScreenSearch");
    } else if (route.name.includes("Home")) {
      setNav("UserScreenHome");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setUserpic(await getProfilePictureUrl(userID));
      const users = await getUser(userID);
      setUser(users[0]);
    };

    if (following) {
      const followingIds = following.map((follower) => follower.id);
      setFollowed(followingIds.includes(userID));
    }

    fetchUser();
    getRouteName();
  }, [userID]);

  useEffect(() => {
    if (following) {
      const followingIds = following.map((follower) => follower.id);
      setFollowed(followingIds.includes(userID));
    }
  }, [following]);

  const unfollow = () => {
    handleUnfollow(session.user.id, userID, refreshUserData);
  };

  const follow = () => {
    handleFollow(session.user.id, userID, refreshUserData);
  };

  if (userpic && user)
    return (
      <TouchableOpacity
        className="p-1 rounded-md flex-row items-center justify-between"
        onPress={() => navigation.navigate(nav, { userID, userpic })}
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
        <View>
          {followed ? (
            <TouchableOpacity
              onPress={unfollow}
              className="bg-black/10 dark:bg-white/10 p-2 rounded-md flex items-center"
            >
              <Text className="dark:text-white font-bold">Unfollow</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={follow}
              className="bg-black/10 dark:bg-white/10 p-2 rounded-md flex items-center"
            >
              <Text className="dark:text-white font-bold">Follow</Text>
            </TouchableOpacity>
          )}
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
