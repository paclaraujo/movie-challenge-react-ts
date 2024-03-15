import { Movie } from "../models/Movie";
import { formatMovie } from "../utils/transformers";

export const getMovies = () : Promise<Movie[]> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_API}`
    }
  };

  return fetch('https://api.themoviedb.org/3/discover/movie', options)
    .then(response => response.json())
    .then(response => response.results.map(formatMovie))
    .catch(err => err);
}