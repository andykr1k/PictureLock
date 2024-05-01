import { Recommend } from "../functions/Recommendation";
import GetMovieDetails from "../functions/GetMovieDetails";
import { useState } from "react";

export default function RecommendationPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleRecommendation = async () => {
    try {
      setIsLoading(true);
      const recommendationsData = await Recommend(search);
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
    <div className="grid place-items-center h-screen z-50">
      <div className="max-w-md space-y-5 z-50">
        <h2 className="text-center text-bold text-lg text-white z-50">
          Recommendation System Beta
        </h2>
        <label className="input input-bordered flex items-center gap-2 z-50">
          <input
            type="text"
            className="grow border-0 outline-0 z-50"
            placeholder="Recently Seen Movie"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleRecommendation}
            className="bg-blue-600 text-white p-1 text-sm rounded-md z-50"
          >
            Recommend
          </button>
        </label>
        <div className="flex justify-center">
          {isLoading ? (
            <div className="carousel carousel-vertical p-4 bg-neutral rounded-box z-50">
              <span className="loading loading-ring loading-lg text-primary text-center"></span>
            </div>
          ) : (
            <div className="carousel carousel-vertical h-96 bg-neutral rounded-box z-50">
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
