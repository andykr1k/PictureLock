import { Button, Text, View, useColorScheme, Image, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';
import { Divider } from '@rneui/base';

export default function Notification(props) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? style.lightPost : style.darkPost;

    return (
        <View style={[style.container, themeContainerStyle]}>
        <View style={{margin: 10}}>
        <View style={[styles.post_h, themeContainerStyle]}>
            <Image
            style={style.logo}
            source={{
                uri: props.image,
            }}
            />
            <Text style={[style.text, themeTextStyle]}>{props.name} {props.status}.</Text>
        </View>
        </View>
        </View>
    );
  }

const style = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  text: {
    marginLeft: 10
  },
  container: {
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: '600',
  },
  username: {
    color: 'gray',
    marginLeft: 3
  },
  content: {
    color: 'gray',
    marginLeft: 3
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  lightButton: {
    backgroundColor: '#ffffff',
  },
  darkButton: {
    backgroundColor: '#242c40',
  },
  lightPost: {
    backgroundColor: '#ffffff',
    borderColor: 'lightgrey',
  },
  darkPost: {
    backgroundColor: '#242c40',
    borderColor: 'grey',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
