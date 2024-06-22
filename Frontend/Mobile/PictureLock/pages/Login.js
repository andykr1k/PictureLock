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
import { IconButton } from "../components";
import { useNavigation } from "@react-navigation/native";


export default function LogInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const logintypes = ["Log In", "Sign Up"];
  const logintypeicons = ["people", "public"];
  const [selectedTypeIndex, setSelectedTypeIndex] = React.useState(0);

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
      } else {
        navigation.navigate("SetUpAccountProfile");
      }
    } else {
      Alert.alert("Please make sure your passwords match!");
    }
  }

  return (
    <View className="flex-1 p-3 space-y-5 mt-10">
      {/* <View className="flex justify-center items-center">
        <Image
          className="w-28 h-28 justify-center items-center"
          style={{ transform: [{ scale: 1.5 }] }}
          source={require("../assets/logo_outline.png")}
          resizeMode="contain"
        />
      </View> */}
      <View className="flex flex-row space-x-2 mt-1">
        {logintypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedTypeIndex(index)}
          >
            <View
              className={`p-1 px-2 rounded-2xl bg-black/10 dark:bg-white/10 border-2 ${
                selectedTypeIndex === index
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
            >
              <View className="flex-row items-center space-x-2">
                <IconButton icon={logintypeicons[index]} size={24} />
                {selectedTypeIndex === index && (
                  <Text className="font-bold dark:text-white">{type}</Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
      {selectedTypeIndex === 1 && (
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
        {selectedTypeIndex === 1 ? (
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
