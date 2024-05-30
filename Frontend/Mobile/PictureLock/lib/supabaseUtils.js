import { supabase } from "./supabase";
import { Alert } from "react-native";
import { decode } from "base64-arraybuffer";

export async function getProfilePictureUrl(id) {
  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .getPublicUrl(id);

  if (error) {
    console.error("Error fetching profile picture:", error);
  }

  if (data.length === 0) {
    console.error("Error fetching profile picture.");
  }

  return data.publicUrl;
}

export async function getUsername(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", id);

  if (error) {
    console.error("Error fetching profile username:", error);
  }

  if (data.length === 0) {
    console.error("Error fetching profile username.");
  }

  return data[0].username;
}


export async function handleUploadProfilePicture(
  profileImage,
  profileImageBytes,
  id,
  refreshUserData
) {
  try {
    if (profileImage) {
      const response = await fetch(profileImage);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();

      if (blob.size === 0) {
        throw new Error("Fetched blob is empty.");
      }

      const fileType = blob.type;

      let { error } = await supabase.storage
        .from("profile-pictures")
        .upload(id, decode(profileImageBytes), {
          cacheControl: "60",
          upsert: true,
          contentType: fileType,
        });

      if (error) {
        console.error("Error uploading file:", error);
      } else {
        Alert.alert("Profile picture updated.");
        refreshUserData();
      }
    } else {
      console.error("No profile image provided.");
    }
  } catch (error) {
    console.error("Error in handleUploadProfilePicture:", error);
  }
}


export async function handleNameUpdate(name, id, refreshUserData) {
  const { error } = await supabase
    .from("profiles")
    .update({ full_name: name })
    .eq("id", id);

  if (error) {
    console.log(error);
  } else {
    Alert.alert("Full name updated.");
    refreshUserData();
  }
}

export async function handleUsernameUpdate(username, id, refreshUserData) {
  const { error } = await supabase
    .from("profiles")
    .update({ username: username })
    .eq("id", id);

  if (error) {
    console.log(error);
  } else {
    Alert.alert("Username updated.");
    refreshUserData();
  }
}

export async function handleLogOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    Alert.alert("Logged out.");
    refreshUserData();
  }
}

export async function handleCreatePost(film, review, stars, user_id) {
  const { error } = await supabase
    .from("posts")
    .insert({ author: user_id, movie_poster: film, content: review, stars: stars })
    .select()

  if (error) {
    console.log(error);
  } else {
    Alert.alert("Post Created");
    refreshUserData();
  }
}

export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select('*')
    .order('created_at', { ascending: false });


  if (error) {
    console.log(error);
  }

  return data
}