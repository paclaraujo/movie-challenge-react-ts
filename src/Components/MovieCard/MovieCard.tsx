import './MovieCard.css';
import { Movie } from "../../models/Movie";

interface Props {
  movie: Movie;
}

const MovieCard = ({ movie } : Props) => {
  return <div className="card">
    <img className="card__image" src={movie.image} />
    <ul className="card__infos">
      <div className="card__infos__container">
        <li className="card__title">{movie.title}</li>
        <li className="card__average">★ {movie.voteAverage.toFixed(1)}</li>
      </div>
      <li className="card__release">{movie.releaseDate.getFullYear()}</li>
    </ul>    
  </div>
};

export default MovieCard;