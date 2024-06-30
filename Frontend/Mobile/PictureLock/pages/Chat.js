import {
  TouchableOpacity,
  View,
  Text,
  ScrollView,
  useColorScheme,
  TextInput,
} from "react-native";
import { RefreshControl } from "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { useUser } from "../lib/UserContext";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import {
  handleConversation,
  getConversation,
  getFriends,
} from "../lib/supabaseUtils";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ConvItem, Conversation, ProfilePicture } from "../components";
import Modal from "react-native-modal";

function Chat() {
  const { session, refreshUserData, conversations } = useUser();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
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

  async function refresh() {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await refreshUserData();
    } catch (error) {
      console.error("Failed to refresh data:", error);
    }
  }

  async function handleNewConversation(id) {
    await handleConversation(session.user.id, id);
    let item = await getConversation(session.user.id, id);
    setModalVisible(false);
    refreshUserData();
    setSearch("");
    setSelectedID("");
    return item;
  }

  function handleSelectedID(userid) {
    if (selectedID !== userid) {
      setSelectedID(userid);
      handleNewConversation(userid);
    } else {
      setSelectedID("");
    }
  }

  const existingConversationFriendIds =
    conversations?.reduce((acc, conv) => {
      if (conv.user1 === session.user.id) {
        acc.push(conv.user2);
      } else if (conv.user2 === session.user.id) {
        acc.push(conv.user1);
      }
      return acc;
    }, []) || [];

  const filteredFriends = friends?.filter(
    (friend) => !existingConversationFriendIds.includes(friend.id)
  );

  return (
    <View className="ios:ios:mt-10 p-3 h-full">
      <Modal
        backdropOpacity={0.2}
        useNativeDriverForBackdrop
        avoidKeyboard
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onSwipeComplete={() => setModalVisible(!modalVisible)}
        swipeDirection={["down"]}
        className="rounded-lg m-0"
      >
        <View className="bg-white/90 dark:bg-black/90 absolute bottom-0 left-0 right-0 rounded-md">
          <View className="flex flex-row justify-center p-3">
            <TouchableOpacity
              className="h-2 bg-black/10 dark:bg-white/10 w-20 rounded-md"
              onPress={handleModal}
            />
          </View>
          <View className="flex-row space-x-2 p-3 pt-0">
            <TextInput
              placeholder="Search for friends"
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              autoComplete="off"
              className="bg-black/10 dark:bg-white/10 p-3 rounded-md dark:text-white flex-1"
            />
          </View>
          <View>
            <ScrollView className="space-x-2 p-3 pb-10">
              <View className="flex flex-row flex-wrap justify-between">
                {filteredFriends &&
                  filteredFriends.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => handleSelectedID(item.id)}
                      key={item.id}
                      className="mb-2"
                    >
                      <ProfilePicture selectedID={selectedID} id={item.id} />
                    </TouchableOpacity>
                  ))}
              </View>
            </ScrollView>
          </View>
        </View>
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
      {conversations && conversations.length > 0 ? (
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
      ) : (
        <Text className="dark:text-white font-bold mt-3">No chats yet!</Text>
      )}
      <TouchableOpacity
        onPress={handleModal}
        className="absolute bottom-0 right-0 p-5 mb-28"
      >
        <View className="w-12 h-12 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center overflow-hidden">
          <Text className="dark:text-white font-light text-xl text-orange-500 align-middle text-center">
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
        headerTintColor: "#F97316",
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
