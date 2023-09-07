import { Text, TouchableOpacity, View, useColorScheme, TextInput, KeyboardAvoidingView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { styles } from '../styles/styles';
import { Post, Comment } from '../components';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import React from 'react';
import CreateRandomFeed from '../functions/CreateRandomFeed';
import LottieView from 'lottie-react-native';
import Feathericons from 'react-native-vector-icons/Feather';

function HomeScreen({ navigation }) {

  const animationRef = React.useRef(null)

  const [data, setData] = React.useState(CreateRandomFeed())
  const [refreshing, setRefreshing] = React.useState(false)
  const colorScheme = useColorScheme();

  const themeIconStyle = colorScheme === 'light' ? 'black' : 'white';
  const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  function refresh() {
    animationRef.current?.play();
    setTimeout(()=>{
      setData(CreateRandomFeed());
      animationRef.current?.play();
    }, 100)
  }
    return (
      <View style={[styles.container, themeContainerStyle]}>
        <ScrollView 
        showsVerticalScrollIndicator={false} 
        refreshControl={<RefreshControl refreshing={false} onRefresh={()=>{refresh()}} tintColor={"transparent"}/>}>
        <View style={[{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 10, paddingBottom: 20, marginTop: 30}, themeContainerStyle]}>
        <LottieView 
        ref={animationRef} 
        source={require('../assets/animation_lm8vj7gb.json')} 
        loop={false} 
        autoPlay
        style={{
            flex: 1,
            alignSelf: 'center',
            width: 75,
            height: 75,
          }}
        />
        </View>
        {data.map((item, index) => {
            return(
            <TouchableOpacity onPress={() => navigation.navigate("Details",{item, index})} key={index}>
                <Post key={index} post={item}/>
            </TouchableOpacity>
          )})}
        </ScrollView>
      </View>
    );
  }

  function PostDetails({ route, navigation }) {
    const { item, index } = route.params;

    const colorScheme = useColorScheme();
  
    const themeTextStyle = colorScheme === 'light' ? styles.lightThemeText : styles.darkThemeText;
    const themeReactions = colorScheme === 'light' ? styles.lightThemeReactions : styles.darkThemeReactions;
    const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
    const [text, onChangeText] = React.useState('Comment');
    const comments = item.comments;
      return (
        <>
        <View style={[styles.container, themeContainerStyle]}>
          <ScrollView>
          <Post key={index} post={item}/>
          {comments.map((item, index) => {
            return (
            <Comment key={index} post={item} />
          )})}
          </ScrollView>
        </View>
        <KeyboardAvoidingView>
        <View style={[styles.postReactions]}>
              <TextInput
                style={[styles.input, themeReactions]}
                onChangeText={onChangeText}
                value={text}
              />
        </View>
        </KeyboardAvoidingView>
        </>
      );
    }

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="PictureLock" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="Details" component={PostDetails}/>
    </HomeStack.Navigator>
  );
}