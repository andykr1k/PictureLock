import { access_key } from "@env";

export async function SearchMovie(query, num) {
  try {
    const response = await fetch(
        'https://api.themoviedb.org/3/search/movie?query=' + query + '&include_adult=true&language=en-US&page=1',
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access_key,
        },
      }
    );
    const data = await response.json();
    return data.results.slice(0, num);
  } catch (error) {
    console.error(error);
  }
}


export async function getPopularMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access_key,
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getTopRatedMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access_key,
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}

export async function getUpcomingMovies() {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + access_key,
        },
      }
    );
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
}
