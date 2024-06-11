import React, { useState, useEffect, memo } from "react";
import GetMovie from "../functions/GetMovie";
import { Image } from "react-native";

const MoviePoster = ({ item, size }) => {
  const [posterUri, setPosterUri] = useState(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const data = await GetMovie(item);
        if (data.poster_path !== null && data.poster_path !== undefined) {
          const uri = `https://image.tmdb.org/t/p/w1280/${data.poster_path}`;
          setPosterUri(uri);
          item.poster = uri;
        }
      } catch (error) {
        console.error("Error fetching poster:", error);
      }
    };

    fetchPoster();
  }, [item]);

  if (!posterUri) {
    return null;
  }

  return size === "small" ? (
    <Image
      key={posterUri}
      source={{ uri: posterUri }}
      className="w-full h-36 rounded-md"
    />
  ) : (
    <Image
      key={posterUri}
      source={{ uri: posterUri }}
      className="w-1/3 h-60 rounded-md"
    />
  );
};

export default memo(MoviePoster);
