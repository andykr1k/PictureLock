import {
  Text,
  View,
  Image,
  Modal,
  ScrollView,
  TextInput,
  Animated,
  TouchableWithoutFeedback,
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

function Post(props) {
  const navigation = useNavigation();
  const { session, refreshUserData } = useUser();
  const [contextVisible, setContextVisible] = useState(false);
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
    { useNativeDriver: false }
  );

  const handleStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        setModalVisible(false);
        setContextVisible(false);
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
    <IconButton key={index} icon="star" size={14} />
  ));

  const handleCommentSubmit = async () => {
    await handleComment(props.post.id, session.user.id, text, refreshUserData);
    setText("");
  };

  const handleCommentsModal = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setModalVisible(!modalVisible);
  }

  const handleShare = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setContextVisible(false);
  };

  const handleDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    // Implement delete functionality
    setContextVisible(false);
  };

  const handleContextModal = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setContextVisible(!contextVisible);
  };

  return (
    <TouchableWithoutFeedback onLongPress={handleContextModal}>
      <View className="w-full mb-3 pb-3">
        <Modal
          animationType="slide"
          transparent={true}
          visible={contextVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setContextVisible(!contextVisible);
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
                height: "25%",
                padding: 16,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View className="flex flex-row justify-center">
                <TouchableOpacity
                  className="h-2 bg-black/10 dark:bg-white/10 w-20 rounded-md"
                  onPress={handleContextModal}
                />
              </View>
              <View className="flex mt-4 space-y-3">
                <Text className="dark:text-white font-bold text-2xl">
                  Share
                </Text>
                <Text className="dark:text-white font-bold text-2xl">Edit</Text>
                <Text className="dark:text-white font-bold text-2xl">
                  Delete
                </Text>
              </View>
            </Animated.View>
          </PanGestureHandler>
        </Modal>
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
                  className="dark:text-white bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md w-[85%]"
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Details", { item });
              }}
            >
              <Image
                source={{ uri: props.post.movie_poster }}
                className="w-full h-[75vh] rounded-md"
              />
            </TouchableOpacity>
          )}
          <View className="flex flex-row space-x-2 w-full absolute bottom-0 p-2 bg-white/90 dark:bg-black/90 rounded-md">
            {userpic && (
              <View className="flex w-1/10">
                {userID === session.user.id ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("profile")}
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
                  <Text className="font-bold dark:text-white">{username}</Text>
                  <Text className="dark:text-white text-xs">
                    &nbsp;· {TimeAgo(props.post.created_at)}
                  </Text>
                  <Text className="dark:text-white text-xs">&nbsp;·&nbsp;</Text>
                  <View className="flex flex-row justify-center">{stars}</View>
                </View>
              </View>
              <View className="flex flex-row w-full justify-between">
                <View className="flex justify-between">
                  {props.post.spoiler ? (
                    <View className="flex flex-1 pr-1">
                      <Text className="dark:text-white text-xs">
                        {props.post.content}
                      </Text>
                      {spoilerBlur && (
                        <View
                          blurRadius={90}
                          className="w-full h-full bg-white/90 dark:bg-black/80 flex flex-row justify-center absolute rounded-md items-center"
                        >
                          <TouchableOpacity
                            onPress={() => setSpoilerBlur(false)}
                          >
                            <Text className="dark:text-white/70 font-bold">
                              Spoiler!
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ) : (
                    <Text className="dark:text-white text-xs pr-1">
                      {props.post.content}
                    </Text>
                  )}
                  <View className="flex flex-row space-x-5 mt-2">
                    <TouchableOpacity onPress={handleCommentsModal}>
                      <IconButton
                        icon="comment"
                        size={24}
                        text={comments && comments.length}
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
                          size={24}
                          text={likes && likes.length}
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() =>
                          handleLike(
                            props.post.id,
                            session.user.id,
                            refreshUserData
                          )
                        }
                      >
                        <IconButton
                          icon="favorite-outline"
                          size={24}
                          text={likes && likes.length}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default memo(Post);
