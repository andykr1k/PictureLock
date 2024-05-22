export default async function Recommend(title, genre) {
    const url = "https://api.picturelock.app:8080/recommend/";

    try {
      const response = await fetch(url + title + '?genre=' + genre);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  }