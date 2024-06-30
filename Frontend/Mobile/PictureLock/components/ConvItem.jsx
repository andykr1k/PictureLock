import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../lib/UserContext";
import {
  DeleteConversation,
  getLastMessage,
  getProfilePictureUrl,
  getUsername,
} from "../lib/supabaseUtils";
import { useState, useEffect, memo } from "react";
import TimeAgo from "../functions/TimeAgo";
import IconButton from "./IconButton";

function ConvItem(props) {
  const [item, setItem] = useState(props.item);
  const [recipient, setRecipient] = useState();
  const [last, setLast] = useState();
  const [lastUsername, setLastUsername] = useState();
  const [username, setUsername] = useState();
  const [pic, setPic] = useState();
  const { session, user, refreshUserData } = useUser();
  const navigation = useNavigation();

  useEffect(() => {
    const setRecipientData = async () => {
      const { user1, user2 } = props.item;
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
          setPic(pic);
        }
        setLast(await getLastMessage(props.item.id));
      }
    };

    setRecipientData();
  }, [props.item, session]);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ConversationChat", { item })}
      className="p-2 pl-0 bg-black/10 dark:bg-white/10 rounded-md mb-2"
    >
      <View className="flex-row items-center ml-2">
        {pic && (
          <Image source={{ uri: pic }} className="w-12 h-12 rounded-full" />
        )}
        <View className="flex-1 ml-2">
          <View className="flex flex-row items-center">
            <Text className="dark:text-white font-bold text-lg">
              {username}
            </Text>
            {last && (
              <Text className="dark:text-white text-xs">
                &nbsp; · {TimeAgo(last.created_at)}
              </Text>
            )}
          </View>
          {last && (
            <View className="flex-row space-x-1">
              {last?.user_id !== session.user.id ? (
                <Text className="dark:text-white text-sm">{username}:</Text>
              ) : (
                <Text className="dark:text-white text-sm">
                  {user.username}:
                </Text>
              )}
              <Text className="dark:text-white text-sm">{last.message}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => DeleteConversation(item.id, refreshUserData)}
          className="mr-2"
        >
          <IconButton icon="delete" size={18} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default memo(ConvItem);
