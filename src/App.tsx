import React, { useState } from "react";
import './styles/movie-search.css';
import { searchMovies } from "./api/moovie";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()!=="") {
      setIsLoading(true);
      try {
        const moviedata = await searchMovies(searchTerm);
        console.log(moviedata);
        setIsOffline(false);
        setMovies(moviedata);
        setSearchTerm('');
        setIsLoading(false);
      } catch (error) {
        if (!navigator.onLine) {
          setIsOffline(true);
          setMovies([]);
        }
        console.error("Error in handleSearch:", error);
        setIsLoading(false);
      }
    }
  };

  // function truncateOverview(overview: string, wordLimit: number): string {
  //   const words = overview.split(" ");

  //   if (words.length <= wordLimit) {
  //     return overview;
  //   }

  //   const truncatedText = words.slice(0, wordLimit).join(" ");
  //   return `${truncatedText} ...`;
  // }
  return (
    <div>
      <h1>Looking for a movie?</h1>
      <div className="search-bar">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Enter a movie name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading ? (
            <button disabled>Searching...</button>
          ) : (
            <button type="submit">Search</button>
          )}
        </form>
      </div>
      <hr />
      {
        isOffline && <h2 style={{ textAlign: "center" }}>Oups😥, tsisy connexion? Alefao donnée na wifi de mandeha🙃.</h2>
      }
      <div
        style={{
          marginTop: "40px",
          justifyContent: "space-around",
          display: "flex",
          flexWrap: "wrap",
          width: "90%",
          margin: "auto",
        }}
      >
        {movies?.map((movie, index) => (
          <div key={index} className="movie-container">
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie"
            />
            <div className="movie-info">
              <p className="movie-title">
                {`${movie.title} (Original title: ${movie.original_title}): ${movie.original_language}`}
              </p>
              {/* <div>
                  <b>Overview: </b> {truncateOverview(movie.overview, 10)}
                </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
