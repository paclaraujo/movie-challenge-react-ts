import { Movie } from "../models/Movie";
import { formatMovie, formatGenresToMap } from "../utils/transformers";
import { getMovieGenres } from "./movieService";

interface getMoviesParams {
  filters : {
    page: number;
    genreId?: number | string | null;
    sortBy?: string | string | null;
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

export const getMovies = async ({filters: { page, genreId, sortBy }} : getMoviesParams) : Promise<getMoviesReturn | string> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_API}`
    }
  };

  const queryParams = `?page=${page}${genreId ? `&with_genres=${genreId}`: ''}${sortBy ? `&sort_by=${sortBy}` : ''}`

  try {
    const fetchResponse = await fetch(
      `https://api.themoviedb.org/3/discover/movie${queryParams}`, options);
    const response = await fetchResponse.json();

    const moviesGenres = await getMovieGenres();
    
    return {
      metaData: {
        pagination: {
          currentPage: response.page,
          totalPages: response.total_pages
        }, 
      },
      movies: response.results.map((result: unknown) => formatMovie(result, formatGenresToMap(moviesGenres)))
    }

  } catch (error) {
    return `Error: ${error}`;
  }
}
