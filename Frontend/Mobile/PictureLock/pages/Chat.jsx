import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  Image,
  useColorScheme,
  Modal,
  TextInput,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import {
  getProfilePictureUrl,
  getUsername,
  handleConversation,
  getConversation,
  getFriends,
  handleMessage,
} from "../lib/supabaseUtils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConvItem, Conversation, ProfilePicture } from "../components";
import { BlurView } from "expo-blur";
import { PanGestureHandler, State } from "react-native-gesture-handler";

function Chat() {
  const { session, refreshUserData, conversations } = useUser();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [friends, setFriends] = useState([]);
  const [selectedID, setSelectedID] = useState("");
  const [convsearch, setConvsearch] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      setFriends(await getFriends(search, session.user.id));
    };

    fetchFriends();
  }, [search]);

  const handleModal = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setModalVisible(!modalVisible);
  };

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
    inputRange: [0, 300],
    outputRange: [0, 300],
    extrapolate: "clamp",
  });

  async function refresh() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await refreshUserData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  }

  async function handleNewConversation() {
    await handleConversation(session.user.id, selectedID);
    let item = await getConversation(session.user.id, selectedID);
    console.log(item);
    await handleMessage(item.id, session.user.id, text);
    refreshUserData();
    setModalVisible(false);
    setSearch("");
    setText("");
    setSelectedID("");
  }

  function handleSelectedID(userid) {
    if (selectedID !== userid) {
      setSelectedID(userid);
    } else {
      setSelectedID("");
    }
  }

  return (
    <View className="ios:ios:mt-10 p-3 h-full">
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
            className="bg-white/90 dark:bg-black/90 space-y-3"
            style={{
              transform: [{ translateY: translateYClamped }],
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80%",
              padding: 16,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View className="flex flex-row justify-center">
              <TouchableOpacity
                className="h-2 bg-black/10 dark:bg-white/10 w-20 rounded-md"
                onPress={handleModal}
              />
            </View>
            <TextInput
              placeholder="Search for friends"
              value={search}
              onChangeText={setSearch}
              className="text-white bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md"
            />
            <View>
              <ScrollView
                className="space-x-2"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {friends &&
                  friends.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => handleSelectedID(item.id)}
                      key={item.id}
                    >
                      <ProfilePicture selectedID={selectedID} id={item.id} />
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
            {selectedID && (
              <TextInput
                placeholder="Send Message"
                value={text}
                onChangeText={setText}
                blurOnSubmit={false}
                onSubmitEditing={handleNewConversation}
                className="text-white bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md"
              />
            )}
          </Animated.View>
        </PanGestureHandler>
      </Modal>
      <View className="flex flex-row justify-between items-center">
        <Text className="dark:text-white font-bold text-3xl">Chats</Text>
      </View>
      <TextInput
        placeholder="Search conversations"
        value={convsearch}
        onChange={setConvsearch}
        className="bg-black/10 dark:bg-white/10 p-3 mt-3 font-bold rounded-md dark:text-white"
      />
      <ScrollView
        className="h-full space-y-3 mt-3"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              refresh();
            }}
          />
        }
      >
        {conversations?.map((item, index) => (
          <ConvItem key={item.id} item={item} />
        ))}
        <View className="p-20"></View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleModal}
        className="absolute bottom-0 right-0 p-5 mb-28"
      >
        <View className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center overflow-hidden">
          <Text className="dark:text-white font-light text-xl text-orange-fruit align-middle text-center">
            +
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const ChatStack = createNativeStackNavigator();

export default function ChatStackScreen() {
  const colorScheme = useColorScheme();
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerTintColor: "#FFB54F",
        headerTitleStyle: { color: colorScheme === "dark" ? "white" : "black" },
      }}
    >
      <ChatStack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ headerShown: false }}
      />
      <ChatStack.Screen
        name="ConversationChat"
        component={Conversation}
        options={{ headerShown: false }}
      />
    </ChatStack.Navigator>
  );
}
