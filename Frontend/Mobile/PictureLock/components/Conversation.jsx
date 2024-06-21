import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getMessages, handleMessage } from "../lib/supabaseUtils";
import { useUser } from "../lib/UserContext";
import { getProfilePictureUrl, getUsername } from "../lib/supabaseUtils";
import IconButton from "./IconButton";

export default function Conversation() {
  const [messages, setMessages] = useState([]);
  const route = useRoute();
  const { item } = route.params;
  const { session, pic } = useUser();
  const [recipient, setRecipient] = useState();
  const [username, setUsername] = useState();
  const [recipientpic, setRecipientpic] = useState();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const setRecipientData = async () => {
      const { user1, user2 } = item;
      let recipientId;

      if (session && session.user && session.user.id) {
        if (user1 !== session.user.id) {
          recipientId = user1;
        } else if (user2 !== session.user.id) {
          recipientId = user2;
        }
        setRecipient(recipientId);

        if (recipientId) {
          const username = await getUsername(recipientId);
          const pic = await getProfilePictureUrl(recipientId);
          setUsername(username);
          setRecipientpic(pic);
        }
      }
    };

    setRecipientData();
  }, [item, session]);

  const fetchMessages = async () => {
    const data = await getMessages(item.id);
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, [item.id]);

  const sendMessage = async () => {
    if (message.trim()) {
      await handleMessage(item.id, session.user.id, message);
      setMessage(""); // Clear the input field
      fetchMessages(); // Re-fetch the messages
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 mb-20 ios:mt-10 p-3 h-full"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex-row items-center space-x-2">
        {recipientpic && (
          <Image
            source={{ uri: recipientpic }}
            className="w-12 h-12 rounded-full"
          />
        )}
        <Text className="dark:text-white font-bold text-xl">{username}</Text>
      </View>
      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="space-y-3">
          {messages &&
            messages.map((message) => (
              <View key={message.id}>
                {message.user_id === session.user.id ? (
                  <View className="flex-row self-end">
                    <View className="p-2 rounded-2xl bg-black/10 dark:bg-white/10 self-center">
                      <Text className="dark:text-white">{message.message}</Text>
                    </View>
                    <Image
                      source={{ uri: pic }}
                      className="w-10 h-10 rounded-full ml-1"
                    />
                  </View>
                ) : (
                  <View className="flex-row">
                    <Image
                      source={{ uri: recipientpic }}
                      className="w-8 h-8 rounded-full mr-1"
                    />
                    <View className="p-2 rounded-2xl bg-black/10 dark:bg-white/10 items-center self-center">
                      <Text className="dark:text-white">{message.message}</Text>
                    </View>
                  </View>
                )}
              </View>
            ))}
        </View>
      </ScrollView>
      <View className="flex-row mb-3 space-x-2">
        <TextInput
          placeholder="Send a message"
          onChangeText={setMessage}
          blurOnSubmit={false}
          onSubmitEditing={sendMessage}
          className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white flex-1"
          value={message}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
