import { Recommend } from "../functions/Recommendation";
import GetMovieDetails from "../functions/GetMovieDetails";
import { useState, useEffect } from "react";
import titles from "../assets/titles.json";

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [genre, setGenre] = useState("action");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionclicked, setSuggestionclicked] = useState(false)

  useEffect(() => {
    const filteredTitles = titles.filter((title) =>
      title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filteredTitles);
  }, [search]);

  useEffect(() => {
    setSuggestionclicked(false);
  }, [suggestions]);

  const handleGenreChange = (event) => {
    setGenre(event.target.dataset.title);
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setSuggestionclicked(true);
    setSuggestions([]);
  };

  const handleRecommendation = async () => {
    try {
      setIsLoading(true);
      const recommendationsData = await Recommend(search, genre);
      setRecommendations(recommendationsData);
      const movieDetails = await GetMovieDetails(recommendationsData);
      setMovies(movieDetails);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-[100dvh] z-50">
      <div className="max-w-sm md:max-w-md space-y-5 z-50">
        <h2 className="text-center text-bold text-xl text-white z-50 font-bold">
          Recommendation System Beta
        </h2>
        {/* <div className="relative">
          <div className="btn-group w-md flex justify-around">
            <div className="flex flex-col items-center w-[23%]">
              <h3 className="absolute mt-3.5 pointer-events-none text-sm text-white">
                Action
              </h3>
              <input
                type="radio"
                name="options"
                data-title="action"
                className="btn w-full rounded-full radio bg-orange-fruit selection:bg-orange-fruit checked:shadow-orange-fruit"
                onChange={handleGenreChange}
                checked={genre === "action"}
              />
            </div>
            <div className="flex flex-col items-center w-[23%]">
              <h3 className="absolute mt-3.5 pointer-events-none text-sm text-white">
                Comedy
              </h3>
              <input
                type="radio"
                name="options"
                data-title="comedy"
                className="btn w-full rounded-full radio bg-orange-fruit"
                onChange={handleGenreChange}
                checked={genre === "comedy"}
              />
            </div>
            <div className="flex flex-col items-center w-[23%]">
              <h3 className="absolute mt-3.5 pointer-events-none text-sm text-white">
                Drama
              </h3>
              <input
                type="radio"
                name="options"
                data-title="drama"
                className="btn w-full rounded-full radio bg-orange-fruit"
                onChange={handleGenreChange}
                checked={genre === "drama"}
              />
            </div>
            <div className="flex flex-col items-center w-[23%]">
              <h3 className="absolute mt-3.5 pointer-events-none text-sm text-white">
                Thriller
              </h3>
              <input
                type="radio"
                name="options"
                data-title="thriller"
                className="btn w-full rounded-full radio bg-orange-fruit text-white"
                onChange={handleGenreChange}
                checked={genre === "thriller"}
              />
            </div>
          </div>
        </div> */}
        <h3 className="text-white m-10 flex justify-center text-center">
          Enter a movie title similar to what you’re seeking to watch.
        </h3>
        <div className="space-y-1">
          <label className="input input-bordered flex items-center gap-2 z-50 bg-orange-fruit">
            <input
              type="text"
              className="grow border-0 outline-0 z-50 placeholder:text-white text-white border-transparent focus:border-0 focus:ring-0 pl-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            <button
              onClick={handleRecommendation}
              className="bg-red-apple/60 hover:bg-red-apple text-white p-2 text-sm rounded-md z-50"
            >
              Recommend
            </button>
          </label>
          {suggestions.length < 5 && suggestionclicked === false && (
            <ul className="absolute w-full max-w-sm md:max-w-md bg-orange-fruit shadow-md z-50 rounded-md text-white">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  className="cursor-pointer py-1 px-3 hover:bg-red-apple/20 rounded-md"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex justify-center">
          {isLoading ? (
            <div className="carousel carousel-vertical p-4 rounded-box z-40 bg-orange-fruit">
              <span className="loading loading-ring loading-lg text-primary text-center bg-white"></span>
            </div>
          ) : (
            <div className="carousel carousel-vertical h-96 bg-neutral rounded-box z-40">
              {movies.map((item, index) => (
                <div key={index} className="carousel-item h-full">
                  <img src={item} className="rounded-box w-64" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
