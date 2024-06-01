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
    refreshUserData();
  }
}

export async function handleLogOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  } else {
    Alert.alert("Logged out.");
  }
}

export async function handleCreatePost(
  film,
  film_id,
  film_poster,
  review,
  stars,
  user_id,
  refreshUserData,
  spoiler
) {
  const { error } = await supabase
    .from("posts")
    .insert({
      author: user_id,
      movie_poster: film_poster,
      movie_name: film,
      movie_id: film_id,
      content: review,
      stars: stars,
      spoiler: spoiler
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleComment(post_id, user_id, comment, refreshUserData) {
  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: post_id,
      user_id: user_id,
      comment: comment,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleDeleteComment(comment_id, refreshUserData) {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", comment_id);

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleLike(post_id, user_id, refreshUserData) {
  const { error } = await supabase
    .from("likes")
    .insert({
      post_id: post_id,
      user_id: user_id,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleUnlike(post_id, user_id, refreshUserData) {
  const { error } = await supabase
    .from("likes")
    .delete()
    .eq("post_id", post_id)
    .eq("user_id", user_id);

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function fetchPosts() {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getUser(id) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Error fetching profile username:", error);
  }

  if (data.length === 0) {
    console.error("Error fetching profile username.");
  }

  return data;
}

export async function getComments(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id)

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getLikes(id) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("post_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}
