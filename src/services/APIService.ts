import { Movie } from "../models/Movie";
import { formatMovie } from "../utils/transformers";
import { getMovieGenres } from "./movieService";

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

export const getMovies = async ({filters: { page }} : getMoviesParams) : Promise<getMoviesReturn | string> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_API}`
    }
  };

  try {
    const fetchResponse = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${page}`, options);
    const response = await fetchResponse.json();

    const moviesGenres = await getMovieGenres();
    
    return {
      metaData: {
        pagination: {
          currentPage: response.page,
          totalPages: response.total_pages
        }, 
      },
      movies: response.results.map((result: unknown) => formatMovie(result, moviesGenres))
    }

  } catch (error) {
    return `Error: ${error}`;
  }
}
