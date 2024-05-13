import { Button, Text, View, useColorScheme, Image } from "react-native";
import { memo } from "react";

function Notification(props) {
  const colorScheme = useColorScheme();

  return (
    <View className="flex flex-row items-center mb-3">
      <Image
        className="w-8 h-8 rounded-md"
        source={{
          uri: props.image,
        }}
      />
      <Text className="ml-2 dark:text-white">
        {props.name} {props.status}.
      </Text>
    </View>
  );
}

export default memo(Notification);