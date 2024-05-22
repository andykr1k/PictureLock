import React, { useState, useEffect, memo } from 'react';
import GetPoster from '../functions/GetPoster';
import {
    Image,
  } from "react-native";

const MoviePoster = ({ item }) => {
    const [posterUri, setPosterUri] = useState(null);

    useEffect(() => {
        const fetchPoster = async () => {
            try {
                const uri = await GetPoster(item);
                setPosterUri(uri);
            } catch (error) {
                console.error('Error fetching poster:', error);
            }
        };

        fetchPoster();
    }, [item]);

    return (
        <Image
            source={{ uri: posterUri }}
            className="w-full h-36 rounded-md"
        />
    );
};

export default memo(MoviePoster);