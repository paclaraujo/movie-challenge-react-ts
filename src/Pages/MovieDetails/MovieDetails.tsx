import { useEffect, useState } from 'react';
import './MovieDetails.css';
import { useParams } from 'react-router-dom';
import { getMoviesDetails } from '../../services/movieService';
import { Movie } from '../../models/Movie';
import Spinner from '../../Components/Spinner/Spinner'

const MovieDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [ movie, setMovie ] = useState<Movie>()

  useEffect(() => {
    if(id) {
      getMoviesDetails(Number(id))
        .then((response) => {
          setMovie(response)
          setIsLoading(false)
        })
        .catch()
    }
  }, [id])
  return <div>
    <a href="/">Voltar</a>
    {isLoading ? <Spinner /> : movie && 
      <div className="movie_details">
        <img className="movie_details__image" src={movie.image} />
        <ul className="movie_details__infos">
          <div className="movie_details__infos__container">
            <li className="movie_details__title">{movie.title}</li>
            <li className="movie_details__average">★ {movie.voteAverage.toFixed(1)}</li>
          </div>
          <li className="movie_details__title">{movie.releaseDate.getFullYear()}</li>
          {movie.genres.map((genre, index  )=> <li key={genre+index} className="movie_details__genres">{genre}</li>)}
          <li className="movie_details__overview">{movie.overview}</li>
        </ul>
      </div>
    }
    
  </div>
};

export default MovieDetails;