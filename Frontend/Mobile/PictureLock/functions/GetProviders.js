import { access_key } from "@env";

export default async function GetProviders(movie) {
  let url = "https://api.themoviedb.org/3/movie/" + movie.id + "/watch/providers";

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
    if (data) {
      return data;
    } else {
      console.log("No providers found for this movie");
      return null;
    }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}
