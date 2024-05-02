export async function Recommend(title, genre) {
  const url = import.meta.env.VITE_PL_API_URL || process.env.VITE_PL_API_URL;

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
