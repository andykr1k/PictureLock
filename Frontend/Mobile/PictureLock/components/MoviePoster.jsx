import React, { useState, useEffect, memo } from "react";
import GetMovie from "../functions/GetMovie";
import { Image } from "react-native";

const MoviePoster = ({ item }) => {
  const [posterUri, setPosterUri] = useState(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const data = await GetMovie(item);
        setPosterUri(`https://image.tmdb.org/t/p/w1280/${data.poster_path}`);
      } catch (error) {
        console.error("Error fetching poster:", error);
      }
    };

    fetchPoster();
  }, [item]);

  return (
    <Image
      key={posterUri}
      source={{ uri: posterUri }}
      className="w-full h-full rounded-md"
    />
  );
};

export default memo(MoviePoster);
