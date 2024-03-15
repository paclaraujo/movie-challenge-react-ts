import { Movie } from "../models/Movie"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatMovie = (movie: any) : Movie => ({
  image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
  title: movie.title,
  releaseDate: new Date(movie.release_date),
  originalLanguage: movie.original_language,
  originalTitle: movie.original_title,
  overview: movie.overview,
  voteAverage: movie.vote_average,
})