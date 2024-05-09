import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/loginSlice";
import LottieView from "lottie-react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  return (
    <View className="flex-1 justify-center items-center">
      {/* <Image style={styles.image} source={require("../assets/icon.png")} />  */}
      <View>
        <LottieView
          source={require("../assets/animation_lm8vj7gb.json")}
          loop={true}
          autoPlay
          className="w-40 h-40"
        />
      </View>
      <StatusBar style="auto" />
      <View className="w-2/3 bg-red-500 h-10 mb-2 rounded-md">
        <TextInput
          className="flex-1 justify-center items-center ml-2"
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View className="w-2/3 bg-red-500 h-10 rounded-md mb-2">
        <TextInput
          className="flex-1 justify-center items-center ml-2"
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity
        onPress={() =>
          dispatch(
            setUser({
              name: "Andrew Krikorian",
              email: "akrikorian12@gmail.com",
              password: password,
              image: "https://randomuser.me/api/portraits/men/47.jpg",
            })
          )
        }
        className="w-2/3 bg-red-500 h-10 rounded-md"
      >
        <View className="flex-1 justify-center items-center">
          <Text>Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
