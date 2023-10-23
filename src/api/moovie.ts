
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzMzMjYzOTgyZjJmYmVkZTA2ZGViYjM1YTkwMDlmZiIsInN1YiI6IjY1MzYwNDdhYzhhNWFjMDEzOWFiNzFkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.UQMiM6v7KIzL2X8ldVggh1Mga6KOQ43LA7SHMnqpGdM",
  },
};

const API_KEY = "7733263982f2fbede06debb35a9009ff";

export const searchMovies = async (moviename:string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${moviename}&api_key=${API_KEY}`,
      options
    );

    if (!response.ok) {
      throw new Error(`Request failed with status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in searchMovies:", error);
    throw error;
  }
};
