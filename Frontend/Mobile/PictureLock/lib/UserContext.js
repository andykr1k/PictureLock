import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { supabase } from "./supabase";
import { getProfilePictureUrl, fetchPosts, getFollowers, getFollowing } from "./supabaseUtils";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [pic, setPic] = useState(null);
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState();
  const [following, setFollowing] = useState();

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
      setPosts(await fetchPosts())
      setFollowers(await getFollowers(userId));
      setFollowing(await getFollowing(userId));
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

  const refreshUserData = useCallback(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [session, fetchUserData]);

  return (
    <UserContext.Provider value={{ session, user, pic, refreshUserData, posts, followers, following }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
