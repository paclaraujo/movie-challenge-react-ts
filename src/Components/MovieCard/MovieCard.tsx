import './MovieCard.css';
import { Movie } from "../../models/Movie";
import { Link } from "react-router-dom";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie } : Props) => {


  return <Link to={`/movie/${movie.id}`}>
    <div className="card">
      <img className="card__image" src={movie.image} />
      <ul className="card__infos">
        <div className="card__infos__container">
          <li className="card__title">{movie.title} | {movie.releaseDate.getFullYear()}</li>
          <li className="card__average">★ {movie.voteAverage.toFixed(1)}</li>
        </div>
        {movie.genres.map((genre, index  )=> <li key={genre+index} className="card__genres">{genre}</li>)}
      </ul>    
    </div>
  </Link>
  
};

export default MovieCard;