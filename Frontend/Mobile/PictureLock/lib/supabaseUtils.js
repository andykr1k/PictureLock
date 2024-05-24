import { supabase } from "./supabase";
import { useUser } from "./UserContext";

export async function signInWithEmail(email, password) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) Alert.alert(error.message);
}

export async function signUpWithEmail(email, password) {
  const { session } = useUser();

  if (password === confirm) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      Alert.alert(error.message);
    } else {
      console.log(session.user.id);
      const { error: insertError } = await supabase.from("Users").insert({
        unique_id: session.user.id,
      });

      if (insertError) {
        Alert.alert(insertError.message);
      } else {
        Alert.alert("Please check your inbox for email verification!");
      }
    }
  } else {
    Alert.alert("Please make sure your passwords match!");
  }
}

export const getProfilePictureUrl = async () => {
  const { session } = useUser();

  const { publicURL } = await supabase.storage
    .from("profile-pictures")
    .getPublicUrl(session.user.id);

  setPic(publicURL);
};

export const handleUploadProfilePicture = async () => {
  if (profileImage) {
    const response = await fetch(profileImage);
    const blob = await response.blob();
    const file = new File([blob], "profile.jpg", { type: "image/jpeg" });

    const url = await uploadProfilePicture(file);
    if (url) {
      console.log("Profile picture uploaded:", url);
    }
  }
};

export const uploadProfilePicture = async (file) => {
  const { session } = useUser();

  let { error } = await supabase.storage
    .from("profile-pictures")
    .upload(session.user.id, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading file:", error);
    return null;
  }
};

export const handleFirstnameUpdate = async (first) => {
  const { session } = useUser();

  const { error } = await supabase
    .from("Users")
    .update({ first_name: first })
    .eq("unique_id", session.user.id);
  if (error) {
    console.log(error);
  }
};

export const handleLastnameUpdate = async (last) => {
  const { session } = useUser();

  const { error } = await supabase
    .from("Users")
    .update({ last_name: last })
    .eq("unique_id", session.user.id);
  if (error) {
    console.log(error);
  }
};

export const handleUsernameUpdate = async (username) => {
  const { session } = useUser();

  const { error } = await supabase
    .from("Users")
    .update({ username: username })
    .eq("unique_id", session.user.id);
  if (error) {
    console.log(error);
  }
};

export const handleLogOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.log(error);
  }
};
