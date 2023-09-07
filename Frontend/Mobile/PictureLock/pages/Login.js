import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, useColorScheme, Button } from "react-native";
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from "../redux/slices/loginSlice";
import LottieView from 'lottie-react-native';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;

  const user = useSelector(
    (state) => state.userState.user
  )
  const dispatch = useDispatch()
  return (
    <View style={[styles.container, themeContainerStyle]}>
      {/* <Image style={styles.image} source={require("../assets/icon.png")} />  */}
      <View>
      <LottieView 
        source={require('../assets/animation_lm8vj7gb.json')} 
        loop={true} 
        autoPlay
        style={{
            width: 100,
            height: 100,
          }}
        />
      </View>
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#003f5c"
          onChangeText={(email) => setEmail(email)}
        /> 
      </View> 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        /> 
      </View> 
      <TouchableOpacity>
        <Text style={[styles.forgot_button, themeTextStyle]}>Forgot Password?</Text> 
      </TouchableOpacity> 
      <TouchableOpacity onPress={() => dispatch(setUser({name:'Andrew Krikorian', email:'akrikorian12@gmail.com', password: password, image: 'https://randomuser.me/api/portraits/men/47.jpg'}))} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text> 
      </TouchableOpacity>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 40,
    height: 40
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
  lightContainer: {
    backgroundColor: '#F5F8FA',
  },
  darkContainer: {
    backgroundColor: '#141d26',
  },
  lightPost: {
    backgroundColor: '#F5F8FA',
  },
  darkPost: {
    backgroundColor: '#141d26',
  },
  lightThemeText: {
    color: '#141d26',
    padding: 6
  },
  darkThemeText: {
    color: '#d0d0c0',
    padding: 6
  },
});