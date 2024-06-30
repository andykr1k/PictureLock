import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getUser,
  getFollowers,
  getFollowing,
  handleFollow,
  handleUnfollow,
  getPosts,
  getCollections,
} from "../lib/supabaseUtils";
import { useEffect, useState, memo } from "react";
import { useUser } from "../lib/UserContext";
import ProfileTabs from "./ProfileTabs";

function ProfileScreen() {
  const { session, refreshUserData, following } = useUser();
  const navigation = useNavigation();
  const route = useRoute();
  const { userID, userpic } = route.params;
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [posts, setPosts] = useState(null);
  const [nav, setNav] = useState(null);
  const [lists, setLists] = useState(null);
  const [textPosts, setTextPosts] = useState([]);
  const [moviePosts, setMoviePosts] = useState([]);

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
      try {
        const user = await getUser(userID);
        setUser(user[0]);

        const fetchedLists = await getCollections(userID);
        setLists(fetchedLists);

        const fetchedFollowers = await getFollowers(userID);
        setFollowers(fetchedFollowers);

        const fetchedFollowing = await getFollowing(userID);
        setFollowings(fetchedFollowing);

        const fetchedPosts = await getPosts(userID);
        setPosts(fetchedPosts);
        const textPostsFiltered = fetchedPosts.filter(
          (post) => !post.movie_poster
        );
        setTextPosts(textPostsFiltered);
        const moviePostsFiltered = fetchedPosts.filter(
          (post) => post.movie_poster
        );
        setMoviePosts(moviePostsFiltered);
        if (fetchedFollowers) {
          const followingIds = fetchedFollowers.map(
            (follower) => follower.following
          );
          setIsFollowing(followingIds.includes(session.user.id));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUser();
    getRouteName();
  }, [userID, following]);

  return (
    <View className="ios:mt-16">
      <View className="flex items-center">
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
        {user && (
          <Text className="dark:text-white font-bold text-2xl p-3">
            @{user.username}
          </Text>
        )}
        <View className="w-full">
          {followers && followings && posts && (
            <View className="flex-row justify-center space-x-10">
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
              <TouchableOpacity className="items-center">
                <Text className="dark:text-white font-bold">0</Text>
                <Text className="dark:text-white font-bold">Badges</Text>
              </TouchableOpacity>
            </View>
          )}

          {session.user.id !== userID && (
            <View className="items-center">
              {isFollowing ? (
                <TouchableOpacity
                  onPress={() =>
                    handleUnfollow(session.user.id, userID, refreshUserData)
                  }
                  className="bg-black/10 dark:bg-white/10 mt-4 p-2 rounded-md flex items-center w-1/2"
                >
                  <Text className="dark:text-white font-bold">Unfollow</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    handleFollow(session.user.id, userID, refreshUserData)
                  }
                  className="bg-black/10 dark:bg-white/10 mt-4 p-2 rounded-md flex items-center w-1/2"
                >
                  <Text className="dark:text-white font-bold">Follow</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>
      <View>
        <ProfileTabs
          id={userID}
          moviePosts={moviePosts}
          textPosts={textPosts}
          lists={lists}
        />
      </View>
    </View>
  );
}

export default memo(ProfileScreen);
