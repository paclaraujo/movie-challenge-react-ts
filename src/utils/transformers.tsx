import { Movie } from "../models/Movie"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatMovie = (movie: any) : Movie => ({
  image: `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`,
  title: movie.title,
  releaseDate: new Date(movie.release_date),
  originalLanguage: movie.original_language,
  originalTitle: movie.original_title,
  overview: movie.overview,
  voteAverage: movie.vote_average,
})