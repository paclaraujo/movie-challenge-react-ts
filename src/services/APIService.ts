import { Movie } from "../models/Movie";
import { formatMovie } from "../utils/transformers";

interface getMoviesParams {
  filters : {
    page: number;
  }
}

interface getMoviesReturn {
  metaData: { 
    pagination: {
      currentPage: number, 
      totalPages: number
    }
  }, 
  movies: Movie[]
}

export const getMovies = ({filters: { page }} : getMoviesParams) : Promise<getMoviesReturn> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_API}`
    }
  };

  return fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}`, options)
    .then(response => response.json())
    .then(response => {
      return {
        metaData: {
          pagination: {
            currentPage: response.page,
            totalPages: response.total_pages
          }, 
        },
        movies: response.results.map(formatMovie)
      }
    })
    .catch(err => err);
}