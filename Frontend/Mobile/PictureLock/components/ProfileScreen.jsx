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
import { useEffect, useState, memo } from "react";
import { useUser } from "../lib/UserContext";
import ProfileTabs from "./ProfileTabs";

function ProfileScreen() {
  const { session, refreshUserData, following } = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const { userID, userpic } = route.params;
  const [user, setUser] = useState();
  const [followers, setFollowers] = useState();
  const [followings, setFollowings] = useState();
  const [isFollowing, setIsFollowing] = useState();
  const [posts, setPosts] = useState();
  const [nav, setNav] = useState()

  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      setNav("FollowScreenProfile");
    } else if (route.name.includes("Search")) {
      setNav("FollowScreenSearch");
    } else if (route.name.includes("Home")) {
      setNav("FollowScreenHome");
    }
  };

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
    getRouteName();
  }, [userID, following]);

  return (
    <View className="ios:mt-10 space-y-5">
      {user && (
        <Text className="dark:text-white font-bold text-3xl p-3">
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
          </View>
        </View>
        <View>
          {followers && followings && posts && (
            <View className="flex flex-row space-x-5 justify-around items-center mt-3">
              <View className="items-center">
                <Text className="dark:text-white font-bold">
                  {posts.length}
                </Text>
                <Text className="dark:text-white font-bold">Posts</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(nav, { followers });
                }}
                className="items-center"
              >
                <Text className="dark:text-white font-bold">
                  {followers?.length}
                </Text>
                <Text className="dark:text-white font-bold">Followers</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(nav, { following });
                }}
                className="items-center"
              >
                <Text className="dark:text-white font-bold">
                  {following?.length}
                </Text>
                <Text className="dark:text-white font-bold">Following</Text>
              </TouchableOpacity>
            </View>
          )}
          {session.user.id !== userID && (
            <View>
              {isFollowing ? (
                <TouchableOpacity
                  onPress={() =>
                    handleUnfollow(session.user.id, userID, refreshUserData)
                  }
                  className="bg-black/10 dark:bg-white/10 mt-4 p-2 rounded-md flex items-center"
                >
                  <Text className="dark:text-white font-bold">Unfollow</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    handleFollow(session.user.id, userID, refreshUserData)
                  }
                  className="bg-black/10 dark:bg-white/10 mt-4 p-2 rounded-md flex items-center"
                >
                  <Text className="dark:text-white font-bold">Follow</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
      <View className="mt-3">
        <ProfileTabs id={userID} posts={posts} section={"profilescreen"} />
      </View>
    </View>
  );
}

export default memo(ProfileScreen);