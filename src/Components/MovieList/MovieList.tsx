import "./MovieList.css";
import { Movie } from "../../models/Movie";
import MovieCard from "../MovieCard/MovieCard";

interface Props {
  movies: Movie[];
}

const MovieList = ({ movies } : Props) => {
  return <div className="list__container">
    {movies.map(movie => <MovieCard key={movie.title} movie={movie}/>)}
  </div>
};

export default MovieList;