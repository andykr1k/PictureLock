import { backend_url } from "@env";;

export default async function Recommend(title, genre) {
  try {
    const response = await fetch(backend_url + title + "?genre=" + genre);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data)
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}
