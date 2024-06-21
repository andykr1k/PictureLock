import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IconButton from "./IconButton";

export default function RecordScreen() {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex justify-center items-center h-full">
        <Text className="dark:text-white">We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Camera Permissions" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center">
      <CameraView className="flex-1" facing={"front"}>
      <View className="flex-1 justify-center items-center">
        <Text className="text-white text-xl font-bold">Coming Soon...</Text>
      </View>
        {/* <View className="absolute w-full bottom-0 mb-28">
          <View className="flex flex-row justify-center">
            <IconButton icon="fiber-manual-record" size={28} />
          </View>
        </View> */}
      </CameraView>
    </View>
  );
}