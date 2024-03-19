import { Movie } from "../models/Movie"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatMovie = (movie: any, map: any) : Movie => {
  const genres = movie.genre_ids.map((id: number)=> map.get(id));
  
  return {
    id: movie.id,
    image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
    title: movie.title,
    releaseDate: new Date(movie.release_date),
    originalLanguage: movie.original_language,
    originalTitle: movie.original_title,
    overview: movie.overview,
    voteAverage: movie.vote_average,
    genres
  }
}

export const formatGenresToMap = (genres: Array<{id: number; name: string}>) => {
  const map = new Map();
  genres.forEach(genre => map.set(genre.id, genre.name))
  return map;
}