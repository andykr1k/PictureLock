import { Button, Text, View, useColorScheme, Image, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';
import { Entypo } from '@expo/vector-icons';
import IconButton from './IconButton';

export default function Post(props) {
  const colorScheme = useColorScheme();

  const themeTextStyle = colorScheme === 'light' ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle = colorScheme === 'light' ? style.lightPost : style.darkPost;
    return (
    <View style={[style.container, themeContainerStyle]}>
        <Image source={{uri:props.image}} style={style.userImage} />

        <View style={style.mainContainer}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row'  }}>
              <Text style={[style.name, themeTextStyle]}>{props.name}</Text>
              {/* <Text style={[style.username, themeTextStyle]}>{props.username}</Text> */}
              <Text style={[style.content, themeTextStyle]}>{props.status} · {props.time}hrs</Text>
            </View>

            <Entypo
              name="dots-three-horizontal"
              size={16}
              color="gray"
              style={{ marginLeft: 'auto' }}
            />
          </View>

          {props.movieURL && <Image source={{uri:props.movieURL}}style={style.image} />}

          <View style={[style.footer, themeContainerStyle]}>
            <IconButton icon="comment" size={22} text={props.numberOfComments} />
            {/* <IconButton icon="retweet" text={props.numberOfShares} /> */}
            <IconButton icon="heart" size={22} text={props.numberOfLikes} />
            <IconButton icon="chart" size={22} text={props.impressions || 0} />
            <IconButton icon="share-apple" size={22} />
          </View>
        </View>
    </View>
    );
  }

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
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
    aspectRatio: 2 / 3,
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
