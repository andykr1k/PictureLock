import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/loginSlice";

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  return (
    <View
      className="flex-1 p-5 space-y-5 bg-orange-fruit"
    >
      <View className="flex items-center mt-20">
        <Image
          className="w-40 h-40 justify-center items-center"
          style={{ transform: [{ scale: 1.5 }] }}
          source={require("../assets/logo_outline.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-xl text-white">Picturelock</Text>
      </View>
      <View className="space-y-1">
        <Text className="font-bold text-white">Username/Email</Text>
        <TextInput
          className="flex-1 justify-center items-center bg-red-apple/10 p-5 rounded-md"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
      <View className="space-y-1">
        <Text className="font-bold text-white">Password</Text>
        <TextInput
          className="flex-1 justify-center items-center bg-red-apple/10 p-5 rounded-md"
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
      >
        <View className=" justify-center items-center bg-red-apple/10 rounded-md p-3">
          <Text className="font-bold text-white text-lg">Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
