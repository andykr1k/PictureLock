import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from "react";
import { supabase } from "./supabase";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [pic, setPic] = useState(null);

  const getProfilePictureUrl = async (id) => {
    const { data, error } = await supabase.storage
      .from("profile-pictures")
      .list(id);

    if (error) {
      console.error("Error fetching profile picture:", error);
    }

    if (data.length === 0) {
      console.error("Error fetching profile picture.");
    }

    const { publicURL } = supabase.storage
      .from("profile-pictures")
      .getPublicUrl(id);

    setPic(publicURL);
  };

  const fetchUserData = useCallback(async (userId) => {
    const { data, error } = await supabase
      .from("Users")
      .select("*")
      .eq("unique_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data: ", error);
    } else {
      setUser(data);
    }
  }, []);

  useEffect(() => {
    const handleSessionChange = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user?.id) {
        fetchUserData(session.user.id);
        getProfilePictureUrl(session.user.id);
      }
    };

    handleSessionChange();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user?.id) {
          fetchUserData(session.user.id);
          getProfilePictureUrl(session.user.id);
        }
      }
    );

    return () => {
      if (authListener && typeof authListener.unsubscribe === "function") {
        authListener.unsubscribe();
      }
    };
  }, [fetchUserData]);

  const refreshUserData = useCallback(() => {
    if (session?.user?.id) {
      fetchUserData(session.user.id);
    }
  }, [session, fetchUserData]);

  return (
    <UserContext.Provider value={{ session, user, pic, refreshUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
