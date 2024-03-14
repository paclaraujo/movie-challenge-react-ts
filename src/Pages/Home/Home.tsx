import { useState, useEffect } from "react";
import { getMovies } from "../../services/APIService";
import MovieList from "../../Components/MovieList/MovieList";
import { Movie } from "../../models/Movie";
import "./Home.css"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getMovies()
      .then((response) => {
        setMovies(response)
        setIsLoading(false)
      }).catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [])


  return <>
    {error ? <p>{error}</p> : isLoading ? <span className="loader"></span> : <MovieList movies={movies}/>}
  </>
  
};

export default Home;