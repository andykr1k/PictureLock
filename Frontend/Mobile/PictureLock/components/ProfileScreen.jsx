import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getUser,
  getProfilePictureUrl,
  getFollowers,
  getFollowing,
  handleFollow,
  handleUnfollow,
} from "../lib/supabaseUtils";
import { useEffect, useState } from "react";
import { useUser } from "../lib/UserContext";

export default function ProfileScreen() {
  const { session, refreshUserData, following } = useUser();

  const navigation = useNavigation();
  const route = useRoute();
  const { userID, userpic } = route.params;
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userID);
      setUser(user[0]);
      const fetchedFollowers = await getFollowers(userID);
      setFollowers(fetchedFollowers);

      const fetchedFollowing = await getFollowing(userID);
      setFollowings(fetchedFollowing);

      if (fetchedFollowers) {
        const followingIds = fetchedFollowers.map(
          (follower) => follower.following
        );
        setIsFollowing(followingIds.includes(session.user.id));
      }
    };

    fetchUser();
  }, [userID, following]);

  return (
    <View className="ios:mt-10 p-3 space-y-2">
      {user && (
        <Text className="dark:text-white font-bold text-3xl">
          {user.username}
        </Text>
      )}
      <View className="flex justify-center items-center">
        {userpic && (
          <Image source={{ uri: userpic }} className="w-32 h-32 rounded-md" />
        )}
        {user && (
          <Text className="dark:text-white font-bold text-3xl mt-2">
            {user.full_name}
          </Text>
        )}
      </View>
      {followers && followings && (
        <View className="flex flex-row space-x-2 justify-center">
          <Text className="dark:text-white">Followers: {followers.length}</Text>
          <Text className="dark:text-white">
            Following: {followings.length}
          </Text>
        </View>
      )}
      <View className="flex flex-row space-x-2 justify-center">
        {isFollowing ? (
          <TouchableOpacity
            onPress={() =>
              handleUnfollow(session.user.id, userID, refreshUserData)
            }
            className="w-full bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md flex items-center"
          >
            <Text className="dark:text-white">Unfollow</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() =>
              handleFollow(session.user.id, userID, refreshUserData)
            }
            className="w-full bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md flex items-center"
          >
            <Text className="dark:text-white">Follow</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
