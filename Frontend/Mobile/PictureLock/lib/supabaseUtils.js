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


export async function handleFirstnameUpdate(first, id, refreshUserData) {
  const { error } = await supabase
    .from("Users")
    .update({ first_name: first })
    .eq("unique_id", id);

  if (error) {
    console.log(error);
  } else {
    Alert.alert("First name updated.");
    refreshUserData();
  }
}

export async function handleLastnameUpdate(last, id, refreshUserData) {
  const { error } = await supabase
    .from("Users")
    .update({ last_name: last })
    .eq("unique_id", id);
  if (error) {
    console.log(error);
  } else {
    Alert.alert("Last name updated.");
    refreshUserData();
  }
}

export async function handleUsernameUpdate(username, id, refreshUserData) {
  const { error } = await supabase
    .from("Users")
    .update({ username: username })
    .eq("unique_id", id);

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
