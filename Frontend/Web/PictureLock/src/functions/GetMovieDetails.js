export default async function GetMovieDetails(ids) {
  const access_key = import.meta.env.VITE_TMDB_ACCESS_KEY || process.env.VITE_TMDB_ACCESS_KEY;

  let api_url_beg = "https://api.themoviedb.org/3/movie/";
  let api_url_end = "?language=en-US";
  const headers = {
    'Authorization': `Bearer ${access_key}`,
    'Content-Type': 'application/json'
  };
  let urls = [];

  for (let i = 0; i < ids.length; i++) {
    let url = api_url_beg + ids[i][1] + api_url_end;
    urls.push(url);
  }

  const fetchData = async (url) => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      return null;
    }
  };

  const fetchPromises = urls.map((url) => fetchData(url));

  return Promise.all(fetchPromises)
    .then((dataArray) => {
      let fetched = [];
      dataArray.forEach((data, index) => {
        if (data.poster_path !== null) {
          fetched.push("https://image.tmdb.org/t/p/w1280/" + data.poster_path);
        }
      });
      return fetched;
    })
    .catch((error) => {
      console.error(
        "There was a problem with one or more fetch operations:",
        error
      );
      return null;
    });
}
