import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, memo } from "react";
import {
  getCollectionMovies,
  DeleteList,
  getProfilePictureUrl,
} from "../lib/supabaseUtils";
import Loading from "./Loading";
import { useUser } from "../lib/UserContext";
import IconButton from "./IconButton";
import TimeAgo from "../functions/TimeAgo";

function List(props) {
  const { session, refreshUserData } = useUser();
  const route = useRoute();
  const [listname, setListname] = useState(props.name);
  const [listid, setListid] = useState(props.list_id);
  const [userID, setUserID] = useState(props.user_id);
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();
  const [nav, setNav] = useState();
  const [movienav, setMovienav] = useState();
  const [userpic, setUserpic] = useState();
  const [profilenav, setProfilenav] = useState();

  const getRouteName = () => {
    if (route.name.includes("Profile")) {
      setNav("ListScreenProfile");
      setMovienav("DetailsProfile");
      setProfilenav("UserScreenProfile");
    } else if (route.name.includes("Search")) {
      setNav("ListScreenSearch");
      setMovienav("DetailsSearch");
      setProfilenav("UserScreenSearch");
    } else if (route.name.includes("Home")) {
      setNav("ListScreenHome");
      setMovienav("DetailsHome");
      setProfilenav("UserScreenHome");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setUserpic(await getProfilePictureUrl(userID));
    };
    fetchData();
  }, [userID]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getCollectionMovies(listid);
        const modifiedData = data.map((movie) => {
          movie.id = movie.movie_id;
          return movie;
        });
        setMovies(modifiedData);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchMovies();
    getRouteName();
  }, [listid]);

  if (movies) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(nav, {
            listname,
            movies,
            userpic,
            userID,
          });
        }}
        className="w-full bg-black/10 dark:bg-white/10 p-2 rounded-md space-y-2"
      >
        <View className="flex flex-row justify-between items-center">
          <View className="flex-row space-x-2 items-center">
            {userID === session.user.id ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileStackScreen")}
              >
                <Image
                  source={{ uri: userpic }}
                  className="w-8 h-8 rounded-full"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(profilenav, {
                    userID,
                    userpic,
                  })
                }
              >
                <Image
                  source={{ uri: userpic }}
                  className="w-8 h-8 rounded-full"
                />
              </TouchableOpacity>
            )}
            <View className="flex-row items-center">
              <Text className="dark:text-white font-bold text-lg">
                {listname}
              </Text>
              <Text className="dark:text-white text-xs">
                &nbsp;· {TimeAgo(props.created_at)}
              </Text>
            </View>
          </View>
          {session.user.id === userID && (
            <TouchableOpacity
              onPress={() => DeleteList(listid, refreshUserData)}
              className="mr-2"
            >
              <IconButton icon="delete" size={18} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-2"
        >
          {movies?.map((item) => (
            <TouchableOpacity
              key={item.id}
              className=""
              onPress={() => {
                navigation.navigate(movienav, { item });
              }}
            >
              <Image
                key={item.id}
                source={{ uri: item.movie_poster }}
                className="w-24 h-36 rounded-md"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </TouchableOpacity>
    );
  }

  return <Loading />;
}

export default memo(List);
