interface getMoviesGenresReturn {
  id: number;
  name: string;
}

export const getMovieGenres = () : Promise<getMoviesGenresReturn[]> => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_TOKEN_API}`
    }
  };

  return fetch(`https://api.themoviedb.org/3/genre/movie/list`, options)
    .then(response => response.json())
    .then(response => response.genres)
    .catch(err => err);
}