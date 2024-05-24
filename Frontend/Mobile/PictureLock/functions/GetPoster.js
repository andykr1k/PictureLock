import { access_key } from "@env";

export default async function GetPoster(movie) {
  let url =
    "https://api.themoviedb.org/3/movie/" + movie.id + "?language=en-US";
  const headers = {
    Authorization: `Bearer ${access_key}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(url, { method: "GET", headers });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w1280/${data.poster_path}`;
      return posterUrl;
    } else {
      console.log("No poster found for this movie");
      return null;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}
