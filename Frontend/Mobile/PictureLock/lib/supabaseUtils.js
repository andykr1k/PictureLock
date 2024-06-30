import { supabase } from "./supabase";
import { Alert } from "react-native";
import { decode } from "base64-arraybuffer";

export async function getProfilePictureUrl(id) {
  const { data, error } = await supabase.storage
    .from("profile-pictures")
    .getPublicUrl(id);

  if (error) {
    console.error("Error fetching profile picture:", error);
    return null;
  }

  if (!data || data.length === 0) {
    console.error("Error fetching profile picture.");
    return null;
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
    return null;
  }

  if (!data || data.length === 0) {
    console.error("No data found for profile with ID:", id);
    return null;
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
      spoiler: spoiler,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleComment(
  post_id,
  user_id,
  comment,
  refreshUserData,
  author
) {
  const { error } = await supabase
    .from("comments")
    .insert({
      post_id: post_id,
      user_id: user_id,
      comment: comment,
      author_id: author,
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

export async function handleLike(post_id, user_id, refreshUserData, author) {
  const { error } = await supabase
    .from("likes")
    .insert({
      post_id: post_id,
      user_id: user_id,
      author_id: author,
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

export async function handleDeletePost(post_id, refreshUserData) {
  const { error } = await supabase.from("posts").delete().eq("id", post_id);

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function getConversation(id1, id2) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .or(
      `and(user1.eq.${id1},user2.eq.${id2}),and(user1.eq.${id2},user2.eq.${id1})`
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data[0];
}

export async function getConversations(id) {
  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .or(`user1.eq.${id},user2.eq.${id}`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getMessages(id) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getLastMessage(id) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data[0];
}

export async function getFriends(search, user) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${search}%`)
    .not("id", "eq", user);

  if (error) {
    console.log(error);
  }

  return data;
}

export async function DeleteConversation(conv_id, refreshUserData) {
  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", conv_id);

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleConversation(user1, user2) {
  const { error } = await supabase
    .from("conversations")
    .insert({
      user1: user1,
      user2: user2,
    })
    .select();

  if (error) {
    console.log(error);
  }
}

export async function handleMessage(conv_id, user_id, message, post_id) {
  const { error } = await supabase
    .from("messages")
    .insert({
      conversation_id: conv_id,
      user_id: user_id,
      message: message,
      post_id: post_id,
    })
    .select();

  if (error) {
    console.log(error);
  }
}

export async function getPosts(id) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author", id)
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

export async function getUserComments(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("author_id", id)
    .not("user_id", "eq", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getUserLikes(id) {
  const { data, error } = await supabase
    .from("likes")
    .select("*")
    .eq("author_id", id)
    .not("user_id", "eq", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getComments(id) {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", id);

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

export async function getFollowers(id) {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getFollowing(id) {
  const { data, error } = await supabase
    .from("followers")
    .select("*")
    .eq("following", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function handleFollow(user_id, follow_id, refreshUserData) {
  const { error } = await supabase
    .from("followers")
    .insert({
      id: follow_id,
      following: user_id,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleUnfollow(user_id, follow_id, refreshUserData) {
  const { error } = await supabase
    .from("followers")
    .delete()
    .eq("id", follow_id)
    .eq("following", user_id);

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleCreateList(name, user_id, refreshUserData) {
  const { data, error } = await supabase
    .from("lists")
    .insert({
      name: name,
      user_id: user_id,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }

  return data[0];
}

export async function DeleteList(list_id, refreshUserData) {
  const { error } = await supabase.from("lists").delete().eq("id", list_id);
  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function handleAddMovieToCollection(
  list_id,
  movie_poster,
  movie_name,
  movie_id,
  refreshUserData
) {
  const { error } = await supabase
    .from("listobjects")
    .insert({
      list_id: list_id,
      movie_poster: movie_poster,
      movie_id: movie_id,
      movie_name: movie_name,
    })
    .select();

  if (error) {
    console.log(error);
  } else {
    refreshUserData();
  }
}

export async function getAllCollections() {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getCollectionsSearch(name) {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .ilike("name", `%${name}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getCollections(id) {
  const { data, error } = await supabase
    .from("lists")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  }

  return data;
}

export async function getCollectionMovies(id) {
  const { data, error } = await supabase
    .from("listobjects")
    .select("*")
    .eq("list_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
  }

  return data;
}
