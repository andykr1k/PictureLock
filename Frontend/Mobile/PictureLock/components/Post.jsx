import { Text, View, useColorScheme, Image, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import IconButton from "./IconButton";
import TimeAgo from "../functions/TimeAgo";

export default function Post(props) {
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light" ? style.lightThemeText : style.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? style.lightPost : style.darkPost;

  const numStars = Math.floor(Math.random() * 5) + 1;

  const stars = Array.from({ length: numStars }, (_, index) => (
    <IconButton key={index} icon="star" size={18} />
  ));

  return (
    <View style={[style.container, themeContainerStyle]}>
      <Image
        source={{ uri: props.post.author.image }}
        style={style.userImage}
      />
      <View style={style.mainContainer}>
        <View style={{ flex: 1, flexDirection: "row", flexGrow: 1 }}>
          <View style={{ flex: 1, flexDirection: "row", flexGrow: 1 }}>
            <Text style={[style.name, themeTextStyle]}>
              {props.post.author.username}
            </Text>
            <Text style={[style.content, themeTextStyle]}>
              {props.post.movie} · {TimeAgo(props.post.createdAt)}
            </Text>
          </View>
          <Entypo
            name="dots-three-horizontal"
            size={16}
            color="gray"
            style={{ marginLeft: "auto" }}
          />
        </View>
        <View style={style.postContainer}>
          <Text style={style.postContent}>{props.post.review}</Text>
          <View style={style.posterContent}>
            {props.post.movieURL && (
              <Image
                source={{ uri: props.post.movieURL }}
                style={style.image}
              />
            )}
            <View style={style.stars}>{stars}</View>
          </View>
        </View>

        {props.post.status == "is watching" ? (
          <></>
        ) : (
          <View style={[style.footer, themeContainerStyle]}>
            <IconButton
              icon="comment"
              size={14}
              text={props.post.comments.length}
            />
            <IconButton
              icon="favorite-outline"
              size={14}
              text={props.post.numberOfLikes}
            />
            <IconButton icon="bookmark-outline" size={14} />
            <IconButton icon="ios-share" size={14} />
          </View>
        )}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postContainer: {
    flexDirection: "row",
    marginTop: 3,
  },
  posterContent: {
    flex: 1,
    maxHeight: "100%",
  },
  stars: {
    flexDirection: "row",
    justifyContent: "center",
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  mainContainer: {
    marginLeft: 10,
    flex: 1,
    flexGrow: 1,
  },
  name: {
    fontWeight: "600",
    fontSize: 12,
  },
  username: {
    color: "gray",
    marginLeft: 3,
  },
  content: {
    color: "gray",
    marginLeft: 3,
    fontSize: 12,
  },
  postContent: {
    color: "gray",
    width: "70%",
    fontSize: 12,
    marginRight: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 2 / 3,
    marginVertical: 10,
    borderRadius: 15,
  },
  footer: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    width: "70%",
  },
  lightButton: {
    backgroundColor: "#F5F8FA",
  },
  darkButton: {
    backgroundColor: "#141d26",
  },
  lightPost: {
    backgroundColor: "#F5F8FA",
    borderColor: "lightgrey",
  },
  darkPost: {
    backgroundColor: "#141d26",
    borderColor: "grey",
  },
  lightThemeText: {
    color: "#141d26",
  },
  darkThemeText: {
    color: "#d0d0c0",
  },
});
