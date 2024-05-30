import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { supabase } from "../lib/supabase";
import SwitchSelector from "react-native-switch-selector";

const switchoptions = [
  { label: "Log in", value: true },
  { label: "Sign up", value: false },
];

export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");

  async function signInWithEmail() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
  }

  async function signUpWithEmail() {
    if (password === confirm) {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) {
        Alert.alert(error.message);
      }
    } else {
      Alert.alert("Please make sure your passwords match!");
    }
  }

  return (
    <View className="flex-1 p-3 space-y-5">
      <View className="flex items-center mt-20">
        <Image
          className="w-40 h-40 justify-center items-center"
          style={{ transform: [{ scale: 1.5 }] }}
          source={require("../assets/logo_outline.png")}
          resizeMode="contain"
        />
        <Text className="font-bold text-xl dark:text-white">Picturelock</Text>
      </View>
      <SwitchSelector
        backgroundColor="orange"
        buttonColor="red"
        selectedColor="white"
        borderColor="blue"
        textColor="white"
        fontSize={16}
        options={switchoptions}
        initial={0}
        onPress={setLogin}
      />
      {/* {!login && (
        <View className="space-y-1">
          <Text className="font-bold dark:text-white">Full Name</Text>
          <TextInput
            className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          />
        </View>
      )} */}
      <View className="space-y-1">
        <Text className="font-bold dark:text-white">Email</Text>
        <TextInput
          className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
        />
      </View>
      <View className="space-y-1">
        <Text className="font-bold dark:text-white">Password</Text>
        <TextInput
          className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
          secureTextEntry={true}
          onChangeText={setPassword}
          placeholder="Enter your password"
          placeholderTextColor="rgba(255, 255, 255, 0.6)"
        ></TextInput>
      </View>
      {!login && (
        <View className="space-y-1">
          <Text className="font-bold dark:text-white">Confirm Password</Text>
          <TextInput
            className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white"
            secureTextEntry={true}
            onChangeText={setConfirm}
            placeholder="Enter your password"
            placeholderTextColor="rgba(255, 255, 255, 0.6)"
          ></TextInput>
        </View>
      )}
      <View className="bg-black/10 dark:bg-white/10 p-3 font-bold rounded-md dark:text-white justify-center items-center">
        {!login ? (
          <TouchableOpacity onPress={signUpWithEmail}>
            <Text className="font-bold dark:text-white text-lg">Sign up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={signInWithEmail}>
            <Text className="font-bold dark:text-white text-lg">Log in</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
