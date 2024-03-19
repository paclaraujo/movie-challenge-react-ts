import { Movie } from "../models/Movie";
import { formatGenresToMap, formatMovie } from "../utils/transformers";

interface getMoviesGenresReturn {
  id: number;
  name: string;
}

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN_API}`
  }
};

export const getMovieGenres = async () : Promise<getMoviesGenresReturn[]> => {
  return fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
    .then(response => response.json())
    .then(response => response.genres)
    .catch(err => err);
}

export const getMoviesDetails = async (id: number) : Promise<Movie> => {
  return fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    .then(response => response.json())
    .then(response => {
      const genre_ids = response.genres.map((genre: {id: number, name: string}) => genre.id);
      return formatMovie({...response, genre_ids}, formatGenresToMap(response.genres))
    })
    .catch(err => err);
}