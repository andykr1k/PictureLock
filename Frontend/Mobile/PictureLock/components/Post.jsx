import {
  Text,
  View,
  Image,
  Modal,
  ScrollView,
  TextInput,
  Animated,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
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

function Post(props) {
  const navigation = useNavigation();
  const { session, refreshUserData } = useUser();
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
      } else {
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const translateYClamped = translateY.interpolate({
    inputRange: [0, 600],
    outputRange: [0, 600],
    extrapolate: "clamp",
  });

  const stars = Array.from({ length: props.post.stars }, (_, index) => (
    <IconButton key={index} icon="star" size={14} />
  ));

  const handleCommentSubmit = async () => {
    await handleComment(props.post.id, session.user.id, text, refreshUserData);
    setText("");
  };

  return (
    <View className="w-full mb-3 border-b-[0.25px] border-black/10 dark:border-white/10 pb-3">
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
            style={{
              transform: [{ translateY: translateYClamped }],
              backgroundColor: "rgba(0, 0, 0, 0.95)",
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
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
            <View className="flex flex-row mt-2 justify-between">
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
      <View className="flex flex-row space-x-2 w-full">
        {userpic && (
          <View className="flex w-1/10">
            {userID === session.user.id ? (
              <TouchableOpacity onPress={() => navigation.navigate("profile")}>
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
            <View className="flex flex-row">
              <Text className="font-bold dark:text-white">{username}</Text>
              <Text className="dark:text-white text-xs">
                &nbsp;· {TimeAgo(props.post.created_at)}
              </Text>
            </View>
            <Entypo name="dots-three-horizontal" size={16} color="gray" />
          </View>
          <View className="flex flex-row w-full justify-between">
            <View className="flex justify-between w-2/3">
              {props.post.spoiler ? (
                <View className="flex flex-1 pr-1">
                  <Text className="dark:text-white text-xs">
                    {props.post.content}
                  </Text>
                  {spoilerBlur && (
                    <View
                      blurRadius={90}
                      className="w-full h-40 bg-black flex flex-row justify-center absolute rounded-md items-center"
                    >
                      <TouchableOpacity onPress={() => setSpoilerBlur(false)}>
                        <Text className="dark:text-white/50 font-bold">
                          Reveal spoiler
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
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                >
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
            <View className="flex flex-row justify-between w-1/3">
              <View className="w-full">
                {props.post.movie_poster && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Details", { item })}
                  >
                    <Image
                      source={{ uri: props.post.movie_poster }}
                      className="w-full h-40 rounded-md"
                    />
                  </TouchableOpacity>
                )}
                <View className="flex flex-row justify-center mt-3">
                  {stars}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(Post);
