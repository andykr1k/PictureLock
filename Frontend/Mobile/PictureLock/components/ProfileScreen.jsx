import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getUser,
  getProfilePictureUrl,
  getFollowers,
  getFollowing,
  handleFollow,
  handleUnfollow,
  getPosts,
} from "../lib/supabaseUtils";
import { useEffect, useState } from "react";
import { useUser } from "../lib/UserContext";
import ProfileTabs from "./ProfileTabs";

export default function ProfileScreen() {
  const { session, refreshUserData, following } = useUser();

  const navigation = useNavigation();
  const route = useRoute();
  const { userID, userpic } = route.params;
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [posts, setPosts] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser(userID);
      setUser(user[0]);
      const fetchedFollowers = await getFollowers(userID);
      setFollowers(fetchedFollowers);

      const fetchedFollowing = await getFollowing(userID);
      setFollowings(fetchedFollowing);

      const fetchedPosts = await getPosts(userID);
      setPosts(fetchedPosts);

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
      <View className="flex flex-row items-center justify-around">
        <View>
          <View className="flex justify-center items-center">
            {userpic && (
              <Image
                source={{ uri: userpic }}
                className="w-24 h-24 rounded-full"
              />
            )}
            {user && (
              <View className="flex flex-row space-x-1 justify-center">
                <Text className="dark:text-white font-bold text-lg">
                  {user.full_name}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View>
          {followers && followings && posts && (
            <View className="flex flex-row space-x-5 justify-around items-center mt-3">
              <View className="items-center">
                <Text className="dark:text-white font-bold">{posts.length}</Text>
                <Text className="dark:text-white font-bold">Posts</Text>
              </View>
              <View className="items-center">
                <Text className="dark:text-white font-bold">
                  {followers.length}
                </Text>
                <Text className="dark:text-white font-bold">Followers</Text>
              </View>
              <View className="items-center">
                <Text className="dark:text-white font-bold">
                  {followings.length}
                </Text>
                <Text className="dark:text-white font-bold">Following</Text>
              </View>
            </View>
          )}
          <View>
            {isFollowing ? (
              <TouchableOpacity
                onPress={() =>
                  handleUnfollow(session.user.id, userID, refreshUserData)
                }
                className="bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md flex items-center"
              >
                <Text className="dark:text-white font-bold">Unfollow</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  handleFollow(session.user.id, userID, refreshUserData)
                }
                className="bg-black/10 dark:bg-white/10 mt-4 p-4 rounded-md flex items-center"
              >
                <Text className="dark:text-white font-bold">Follow</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <ProfileTabs id={userID} posts={posts} />
    </View>
  );
}
