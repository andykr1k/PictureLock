import { View, Text, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Conversation() {
  const route = useRoute();
  const { profile } = route.params;

  return (
    <View className="ios:ios:mt-10 p-3 space-y-3 h-full">
      <View className="flex-row items-center space-x-2">
        <Image
          source={{ uri: profile.pic }}
          className="w-8 h-8 rounded-full"
        />
        <Text className="dark:text-white font-bold text-xl">
          {profile.username}
        </Text>
      </View>
    </View>
  );
}
