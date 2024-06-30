import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "./supabase";
import {
  getProfilePictureUrl,
  fetchPosts,
  getFollowers,
  getFollowing,
  getUserLikes,
  getUserComments,
  getConversations,
  getCollections,
} from "./supabaseUtils";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [pic, setPic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();
  const [userlikes, setUserlikes] = useState();
  const [usercomments, setUsercomments] = useState();
  const [notifications, setNotifications] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [lists, setLists] = useState([]);

  const fetchUserData = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data: ", error);
    } else {
      setUser(data);
      setPic(await getProfilePictureUrl(userId));
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);

      setFollowers(await getFollowers(userId));
      setFollowing(await getFollowing(userId));
      setConversations(await getConversations(userId));
      setLists(await getCollections(userId));
      const likes = await getUserLikes(userId);
      const comments = await getUserComments(userId);
      const likesWithType = likes?.map((like) => ({
        ...like,
        type: "like",
      }));
      const commentsWithType = comments?.map((comment) => ({
        ...comment,
        type: "comment",
      }));
      setUserlikes(likesWithType);
      setUsercomments(commentsWithType);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        fetchUserData(session.user.id);
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        fetchUserData(session.user.id);
      }
    });
  }, []);

  useEffect(() => {
    if (userlikes && usercomments) {
      const combinedNotifications = [...userlikes, ...usercomments];
      combinedNotifications.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setNotifications(combinedNotifications);
    }
  }, [userlikes, usercomments]);

  const refreshUserData = useCallback(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [session, fetchUserData]);

  return (
    <UserContext.Provider
      value={{
        session,
        user,
        pic,
        refreshUserData,
        posts,
        followers,
        following,
        notifications,
        conversations,
        lists,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
