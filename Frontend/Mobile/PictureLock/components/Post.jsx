import {
  Text,
  View,
  Image,
  Modal,
  ScrollView,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
  Pressable,
  Linking
} from "react-native";
import IconButton from "./IconButton";
import TimeAgo from "../functions/TimeAgo";
import {
  getProfilePictureUrl,
  getUsername,
  getComments,
  getLikes,
  handleLike,
  handleUnlike,
  handleComment,
  handleDeletePost,
} from "../lib/supabaseUtils";
import { useState, useEffect, memo, useRef } from "react";
import { useUser } from "../lib/UserContext";
import Comment from "./Comment";
import { useNavigation } from "@react-navigation/native";
import {
  TouchableOpacity,
  PanGestureHandler,
  State,
} from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { BlurView } from "expo-blur";

function Post(props) {
  const navigation = useNavigation();
  const { session, refreshUserData } = useUser();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [userpic, setUserpic] = useState("");
  const [comments, setComments] = useState(null);
  const [likes, setLikes] = useState(null);
  const [liked, setLiked] = useState(false);
  const [text, setText] = useState("");
  const [item, setItem] = useState({ id: props.post.movie_id });
  const [spoilerBlur, setSpoilerBlur] = useState(true);
  const [userID, setuserID] = useState(props.post.author);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername(props.post.author);
      setUsername(username);
    };

    const fetchUserPicture = async () => {
      const pic = await getProfilePictureUrl(props.post.author);
      setUserpic(pic);
    };

    const fetchComments = async () => {
      const comments = await getComments(props.post.id);
      setComments(comments);
      props.post.comments = comments;
    };

    const fetchLikes = async () => {
      const likes = await getLikes(props.post.id);
      setLikes(likes);
      props.post.likes = likes;
      setLiked(likes.some((like) => like.user_id === session.user.id));
    };

    fetchUsername();
    fetchUserPicture();
    fetchComments();
    fetchLikes();
  }, [props.post]);

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: true }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        setModalVisible(false);
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const translateYClamped = translateY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  const stars = Array.from({ length: props.post.stars }, (_, index) => (
    <IconButton color={"white"} key={index} icon="star" size={14} />
  ));

  const handleCommentSubmit = async () => {
    await handleComment(
      props.post.id,
      session.user.id,
      text,
      refreshUserData,
      props.post.author
    );
    setText("");
  };

  const handleCommentsModal = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setModalVisible(!modalVisible);
  };

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const postUrl = `https://yourapp.com/posts/${props.post.id}`;
    const message = `Check out this post: ${postUrl}`;

    const url = `sms:?&body=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch((err) => console.error('Error opening SMS app', err));
  };

  const handleDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Implement delete functionality
  };

  return (
    <TouchableWithoutFeedback>
      <View className="w-full mb-3 pb-3">
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <PanGestureHandler
            onGestureEvent={handleGesture}
            onHandlerStateChange={handleStateChange}
          >
            <Animated.View
              className="bg-white/90 dark:bg-black/90"
              style={{
                transform: [{ translateY: translateYClamped }],
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "75%",
                padding: 16,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View className="flex flex-row justify-center">
                <TouchableOpacity
                  className="h-2 bg-black/10 dark:bg-white/10 w-20 rounded-md"
                  onPress={handleCommentsModal}
                />
              </View>
              <View className="flex flex-row mt-3 justify-between">
                <TextInput
                  placeholder="Comment"
                  value={text}
                  onChangeText={setText}
                  className="text-white bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md w-[85%]"
                />
                <TouchableOpacity
                  onPress={handleCommentSubmit}
                  className="bg-black/10 dark:bg-white/10 p-4 rounded-md"
                >
                  <IconButton icon="upload" size={20} />
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} className="mt-2">
                {comments &&
                  comments.map((item, index) => (
                    <Comment key={index} post={item} />
                  ))}
              </ScrollView>
            </Animated.View>
          </PanGestureHandler>
        </Modal>
        <View className="">
          {props.post.movie_poster && (
            <Pressable
              onPress={() => {
                navigation.navigate("Details", { item });
              }}
            >
              <Image
                source={{ uri: props.post.movie_poster }}
                className="w-full h-[75vh] rounded-md"
              />
            </Pressable>
          )}
          <BlurView className="flex flex-row space-x-2 w-full absolute bottom-0 p-2 overflow-hidden rounded-md">
            {userpic && (
              <View className="flex w-1/10">
                {userID === session.user.id ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("ProfileStackScreen")}
                  >
                    <Image
                      source={{ uri: userpic }}
                      className="w-8 h-8 rounded-md"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ProfileScreen", { userID, userpic })
                    }
                  >
                    <Image
                      source={{ uri: userpic }}
                      className="w-8 h-8 rounded-md"
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            <View className="flex-1 w-8/10">
              <View className="flex flex-row justify-between mb-1">
                <View className="flex flex-row items-center">
                  <Text className="font-bold text-white">{username}</Text>
                  <Text className="text-white text-xs">
                    &nbsp;· {TimeAgo(props.post.created_at)}
                  </Text>
                  <Text className="text-white text-xs">&nbsp;·&nbsp;</Text>
                  <View className="flex flex-row justify-center">{stars}</View>
                </View>
              </View>
              <View className="flex flex-row w-full justify-between">
                <View className="flex justify-between">
                  {props.post.spoiler ? (
                    <View className="flex flex-1 pr-1">
                      <Text className="text-white text-xs">
                        {props.post.content}
                      </Text>
                      {spoilerBlur && (
                        <BlurView className="w-full h-full flex flex-row justify-center absolute rounded-md items-center overflow-hidden">
                          <TouchableOpacity
                            onPress={() => setSpoilerBlur(false)}
                          >
                            <Text className="text-white/70 font-bold">
                              Spoiler!
                            </Text>
                          </TouchableOpacity>
                        </BlurView>
                      )}
                    </View>
                  ) : (
                    <Text className="text-white text-xs pr-1">
                      {props.post.content}
                    </Text>
                  )}
                  <View className="flex flex-row space-x-5 mt-2">
                    <TouchableOpacity onPress={handleCommentsModal}>
                      <IconButton
                        icon="comment"
                        size={20}
                        text={comments && comments.length}
                        color={"white"}
                      />
                    </TouchableOpacity>
                    {liked ? (
                      <TouchableOpacity
                        onPress={() =>
                          handleUnlike(
                            props.post.id,
                            session.user.id,
                            refreshUserData
                          )
                        }
                      >
                        <IconButton
                          icon="favorite"
                          size={20}
                          text={likes && likes.length}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          handleLike(
                            props.post.id,
                            session.user.id,
                            refreshUserData,
                            props.post.author
                          )
                        }
                      >
                        <IconButton
                          icon="favorite-outline"
                          size={20}
                          text={likes && likes.length}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={handleShare}>
                      <IconButton icon="ios-share" size={20} color={"white"} />
                    </TouchableOpacity>
                    {props.post.author === session.user.id && (
                      <TouchableOpacity onPress={() => handleDeletePost(props.post.id, refreshUserData)}>
                        <IconButton
                          icon="delete-outline"
                          size={20}
                          color={"white"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </BlurView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(Post);
