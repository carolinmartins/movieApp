import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";

// 52aac9aa

// create static variable
const API_URL = "http://www.omdbapi.com?apikey=52aac9aa";

//use this as static data just to render out something so we know what JSX are we writing
const movie1 = {
  Title: "Shrek",
  Year: "2001",
  imdbID: "tt0126029",
  Type: "movie",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BOGZhM2FhNTItODAzNi00YjA0LWEyN2UtNjJlYWQzYzU1MDg5L2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
};

const App = () => {
  // get our movies to our console log all the way to MovieCard where we can map them
  //create a new state for this!!
  const [movies, setMovies] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState({ query: "", list: [] });

  const handleChange = async (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    const response = await fetch(`${API_URL}&s=${newSearchTerm}`);
    const receiveJson = await response.json();
    setMovies(receiveJson.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          placeholder="Search for a movie"
          value={searchTerm.query} //now it's dynamic state
          onChange={handleChange} // e = event
        />

        <img src={SearchIcon} alt="search" />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
