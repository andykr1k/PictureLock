import { View } from "react-native";
import LottieView from "lottie-react-native";
import { memo } from "react";

function Loading() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={require("../assets/loading.json")}
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
}

export default memo(Loading);