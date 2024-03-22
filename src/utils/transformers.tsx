import { Movie } from "../models/Movie"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatMovie = (movie: any, map: any) : Movie => {
  const genres = movie.genre_ids.map((id: number)=> map.get(id));
  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://github.com/paclaraujo/movie-challenge-react-ts/assets/39506102/6f631dbf-893c-4800-8ed0-f81b8394c262'
  
  return {
    id: movie.id,
    image,
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

export const formatGenresToOptions = (genres: Array<{id: number; name: string}>) : Array<{value: number; label: string}> => {
  return genres.map(genre => ({value: genre.id, label: genre.name}))
}