import React, { useState, useEffect, memo, useRef } from "react";
import {
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  Animated,
  TouchableOpacity,
  Linking,
  Pressable,
  useColorScheme
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import Modal from "react-native-modal";
import { useUser } from "../lib/UserContext";
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
import * as Haptics from "expo-haptics";
import { TapGestureHandler, State } from "react-native-gesture-handler";
import Comment from "./Comment";

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
  const [spoiler, setSpoiler] = useState(props.post.spoiler);
  const [content, setContent] = useState(props.post.content);
  const [userID, setuserID] = useState(props.post.author);
  const [deleted, setDeleted] = useState(false);
  const [nav, setNav] = useState();
  const route = useRoute();
  const [userscreennav, setUserscreennav] = useState();
  const [heartVisible, setHeartVisible] = useState(false);
  const [heartPosition, setHeartPosition] = useState({ x: 0, y: 0 });
  const opacityValue = useRef(new Animated.Value(0)).current;
  const sizeValue = useRef(new Animated.Value(0)).current;
  const colorScheme = useColorScheme();

  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      return ["DetailsProfile", "UserScreenProfile"];
    } else if (route.name.includes("Search")) {
      return ["DetailsSearch", "UserScreenSearch"];
    } else if (route.name.includes("Home")) {
      return ["DetailsHome", "UserScreenHome"];
    }
    return ["", ""];
  };

  const onDoubleTapEvent = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      const { x, y } = nativeEvent;
      handleLikePost();
      setHeartPosition({ x: x-32, y: y-32 });
      setHeartVisible(true);
      animateHeart();
      setTimeout(() => setHeartVisible(false), 1000);
    }
  };

  const handleLikePost = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (!liked) {
      handleLike(
        props.post.id,
        session.user.id,
        refreshUserData,
        props.post.author
      );
      setLiked(true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = await getUsername(props.post.author);
        setUsername(username);
        const pic = await getProfilePictureUrl(props.post.author);
        setUserpic(pic);
        const fetchedComments = await getComments(props.post.id);
        setComments(fetchedComments);
        props.post.comments = fetchedComments;
        const fetchedLikes = await getLikes(props.post.id);
        setLikes(fetchedLikes);
        setLiked(
          fetchedLikes?.some((like) => like.user_id === session.user.id)
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const [nav, userscreennav] = getRouteName();
    setNav(nav);
    setUserscreennav(userscreennav);
  }, [props.post]);

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
    const postUrl = `picturelock://posts/${props.post.id}`;
    const message = `Check out this post: ${postUrl}`;
    const url = `sms:?&body=${encodeURIComponent(message)}`;
    Linking.openURL(url).catch((err) =>
      console.error("Error opening SMS app", err)
    );
  };

  const handleDelete = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    await setDeleted(true);
    await handleDeletePost(props.post.id, refreshUserData);
    if (route.name.includes("Profile")) {
      navigation.navigate("Profile");
    }
  };

  const animateHeart = () => {
    opacityValue.setValue(0);
    sizeValue.setValue(0);

    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacityValue, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(sizeValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (deleted) {
    return null;
  }

  return (
    <View className="relative">
      <TapGestureHandler
        onHandlerStateChange={onDoubleTapEvent}
        numberOfTaps={2}
      >
        <View className="w-full pb-2">
          <Modal
            backdropOpacity={0.2}
            useNativeDriverForBackdrop
            avoidKeyboard
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(!modalVisible)}
            onSwipeComplete={() => setModalVisible(!modalVisible)}
            swipeDirection={["down"]}
            className="rounded-2xl m-0"
          >
            <View className="bg-white/90 dark:bg-black/90 absolute bottom-0 left-0 right-0 rounded-2xl pb-5">
              <View className="flex items-center justify-center p-3 pb-0 space-y-1">
                <TouchableOpacity
                  className="h-2 bg-black/10 dark:bg-white/10 w-20 rounded-md"
                  onPress={handleCommentsModal}
                />
                <Text className="dark:text-white font-bold text-center">
                  {comments ? `${comments.length} comments` : "0 comments"}
                </Text>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1 }}
                className="mt-2 p-3 pt-0 pb-1"
                keyboardShouldPersistTaps="handled"
              >
                {comments &&
                  comments.map((item, index) => (
                    <Comment key={index} post={item} />
                  ))}
              </ScrollView>
              <View className="flex-row space-x-2 p-3 pt-0 pb-5">
                <TextInput
                  placeholder="Comment"
                  value={text}
                  onChangeText={setText}
                  onSubmitEditing={handleCommentSubmit}
                  autoCorrect={false}
                  autoComplete="off"
                  className="bg-black/10 dark:bg-white/10 p-3 rounded-md dark:text-white flex-1"
                />
              </View>
            </View>
          </Modal>
          {props.post.movie_poster === "" ||
          props.post.movie_poster === null ? (
            <BlurView
              intensity={20}
              className="flex flex-row space-x-2 w-full p-2 overflow-hidden rounded-md bg-black/10 dark:bg-white/10"
            >
              {userpic && (
                <View className="flex w-1/10">
                  <TouchableOpacity
                    onPress={() =>
                      userID === session.user.id
                        ? navigation.navigate("ProfileStackScreen")
                        : navigation.navigate(userscreennav, {
                            userID,
                            userpic,
                          })
                    }
                  >
                    <Image
                      source={{ uri: userpic }}
                      className="w-8 h-8 rounded-full"
                    />
                  </TouchableOpacity>
                </View>
              )}
              <View className="flex-1 w-8/10">
                <View className="flex flex-row justify-between mb-1">
                  <View className="flex flex-row items-center">
                    <Text className="font-bold dark:text-white">
                      {username}
                    </Text>
                    {stars.length > 0 && (
                      <>
                        <Text className="dark:text-white text-xs">
                          &nbsp;·&nbsp;
                        </Text>
                        <View className="flex flex-row justify-center">
                          {stars}
                        </View>
                      </>
                    )}
                    <Text className="dark:text-white text-xs">
                      · {TimeAgo(props.post.created_at)}
                    </Text>
                  </View>
                </View>
                <View className="flex flex-row w-full justify-between">
                  <View className="flex">
                    {content.length > 0 && (
                      <View>
                        {spoiler ? (
                          <View className="flex flex-1 pr-1  rounded-lg">
                            <Text className="dark:text-white text-xs">
                              {content}
                            </Text>
                            {spoilerBlur && (
                              <BlurView className="w-full h-full flex flex-row justify-center absolute items-center">
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
                          <Text className="dark:text-white text-xs pr-1 ">
                            {content}
                          </Text>
                        )}
                      </View>
                    )}
                    <View className="flex flex-row space-x-5 mt-2">
                      <TouchableOpacity onPress={handleCommentsModal}>
                        <IconButton
                          icon="comment"
                          size={20}
                          text={comments && comments?.length}
                          color={colorScheme === "dark" ? "white" : "black"}
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
                            text={likes && likes?.length}
                            color={colorScheme === "dark" ? "white" : "black"}
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
                            text={likes && likes?.length}
                            color={colorScheme === "dark" ? "white" : "black"}
                          />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity onPress={handleShare}>
                        <IconButton
                          icon="ios-share"
                          size={20}
                          color={colorScheme === "dark" ? "white" : "black"}
                        />
                      </TouchableOpacity>
                      {props.post.author === session.user.id && (
                        <TouchableOpacity onPress={handleDelete}>
                          <IconButton
                            icon="delete-outline"
                            size={20}
                            color={colorScheme === "dark" ? "white" : "black"}
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </BlurView>
          ) : (
            <View className="">
              <Pressable
                onPress={() => {
                  navigation.navigate(nav, {
                    item: { id: props.post.movie_id },
                  });
                }}
              >
                <Image
                  source={{ uri: props.post.movie_poster }}
                  className="w-full h-[75vh] rounded-md"
                />
              </Pressable>
              <BlurView
                intensity={20}
                className="flex flex-row space-x-2 w-full absolute bottom-0 p-2 overflow-hidden rounded-md bg-black/20"
              >
                {userpic && (
                  <View className="flex w-1/10">
                    <TouchableOpacity
                      onPress={() =>
                        userID === session.user.id
                          ? navigation.navigate("ProfileStackScreen")
                          : navigation.navigate(userscreennav, {
                              userID,
                              userpic,
                            })
                      }
                    >
                      <Image
                        source={{ uri: userpic }}
                        className="w-8 h-8 rounded-full"
                      />
                    </TouchableOpacity>
                  </View>
                )}
                <View className="flex-1 w-8/10">
                  <View className="flex flex-row justify-between mb-1">
                    <View className="flex flex-row items-center">
                      <Text className="font-bold text-white">{username}</Text>
                      <Text className="text-white text-xs">&nbsp;·&nbsp;</Text>
                      <View className="flex flex-row justify-center">
                        {stars}
                      </View>
                      <Text className="text-white text-xs">
                        · {TimeAgo(props.post.created_at)}
                      </Text>
                    </View>
                  </View>
                  <View className="flex flex-row w-full justify-between">
                    <View className="flex">
                      {content.length > 0 && (
                        <View>
                          {spoiler ? (
                            <View className="relative  rounded-lg">
                              <Text className="text-white text-xs">
                                {content}
                              </Text>
                              {spoilerBlur && (
                                <BlurView className="w-full h-full flex flex-row justify-center absolute items-center">
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
                            <Text className="text-white text-xs pr-1 ">
                              {content}
                            </Text>
                          )}
                        </View>
                      )}
                      <View className="flex flex-row space-x-5 mt-2">
                        <TouchableOpacity onPress={handleCommentsModal}>
                          <IconButton
                            icon="comment"
                            size={20}
                            text={comments && comments?.length}
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
                              text={likes && likes?.length}
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
                              text={likes && likes?.length}
                              color={"white"}
                            />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleShare}>
                          <IconButton
                            icon="ios-share"
                            size={20}
                            color={"white"}
                          />
                        </TouchableOpacity>
                        {props.post.author === session.user.id && (
                          <TouchableOpacity onPress={handleDelete}>
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
          )}
        </View>
      </TapGestureHandler>
      {heartVisible && (
        <Animated.View
          style={{
            position: "absolute",
            top: heartPosition.y,
            left: heartPosition.x,
            opacity: opacityValue,
            transform: [{ scale: sizeValue }],
            zIndex: 9999,
          }}
        >
          <IconButton
            icon={"favorite"}
            size={64}
            color={colorScheme === "dark" ? "white" : "black"}
          />
        </Animated.View>
      )}
    </View>
  );
}

export default memo(Post);
