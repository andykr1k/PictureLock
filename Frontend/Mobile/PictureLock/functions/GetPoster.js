export default async function GetPoster(movie) {
    const access_key = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzOThkOWRhYjI1NmQyNTJkMDM0MDM3MzY3ODkzZGMyYyIsInN1YiI6IjY2MzE3NjBlZDE4NTcyMDEyNTMzN2NmMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HdwcQwkQqUwf0WrEkm_iAXX8n8iY6ocxYfHotSBggt4";

    let url = "https://api.themoviedb.org/3/movie/" + movie.id + "?language=en-US";
    const headers = {
      'Authorization': `Bearer ${access_key}`,
      'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, { method: 'GET', headers });
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
