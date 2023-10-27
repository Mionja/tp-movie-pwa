import React, { useState } from "react";
import "../styles/movie-search.css";
import { searchMovies } from "../api/moovie";
import { logout } from "../api/auth";
import Auth from "./Auth";
import '../styles/movie.css';

const Movie: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<any[]>([]);
  const [isOffline, setIsOffline] = useState<boolean>(false);
  const apiKey: string | null = localStorage.getItem("api_key");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      setIsLoading(true);
      try {
        const moviedata = await searchMovies(searchTerm);
        console.log(moviedata);
        setIsOffline(false);
        setMovies(moviedata);
        setSearchTerm("");
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

  if (!apiKey) {
    return <Auth />;
  }
  return (
    <div>
      <header>
        <h1>TP-MIONJA</h1>
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Nom du film"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading ? (
              <button disabled>Recherche...</button>
            ) : (
              <button type="submit">Rechercher</button>
            )}
          </form>
        </div>
      </header>
      <hr />
      {isOffline && (
        <h2 style={{ textAlign: "center" }}>Oups😥, you're offline.</h2>
      )}
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
            </div>
          </div>
        ))}
      </div>
      <div className="deco">
        <button onClick={logout}>Deconnexion</button>
      </div>
    </div>
  );
};
export default Movie;
