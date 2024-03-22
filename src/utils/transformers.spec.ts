import { formatMovie, formatGenresToMap, formatGenresToOptions } from "./transformers";

describe("formatMovie", () => {
  it("should format movie API infos according to Movie type", () => {
    const APIMovie = {
      id: 792307,
      adult: false,
      backdrop_path: "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
      genre_ids: [
        878,
        10749,
        35
      ],
      original_language: "en",
      original_title: "Poor Things",
      overview: "Brought back to life by an unorthodox scientist.",
      popularity: 1968.226,
      poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      release_date: "2023-12-07",
      title: "Poor Things",
      video: false,
      vote_average: 7.901,
      vote_count: 2183
    }

    const formatedMovie = formatMovie(APIMovie, formatGenresToMap([{id: 878, name: 'Action'}, {id: 10749, name: 'Drama'}, {id: 35, name: 'Comedy'}]));
    expect(formatedMovie).toStrictEqual({
      id: 792307,
      image: `https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
      title: "Poor Things",
      releaseDate: new Date("2023-12-07"),
      originalLanguage: "en",
      originalTitle: "Poor Things",
      overview:  "Brought back to life by an unorthodox scientist.",
      voteAverage: 7.901,
      genres: ["Action", "Drama", "Comedy"]
    })
  })
})

describe('formatGenresToMap', () => {  
  it('deve retornar um mapa com os gêneros corretamente mapeados', () => {
    const genres = [{ id: 1, name: 'Ação' }, { id: 2, name: 'Comédia' }];
    const result = formatGenresToMap(genres);
    expect(result.get(1)).toBe('Ação');
    expect(result.get(2)).toBe('Comédia');
  });
});

describe('formatGenresToOptions', () => {
  it('deve retornar uma lista de opções com os valores e rótulos corretos', () => {
    const genres = [{ id: 1, name: 'Ação' }, { id: 2, name: 'Comédia' }];
    const result = formatGenresToOptions(genres);
    expect(result).toEqual([{ value: 1, label: 'Ação' }, { value: 2, label: 'Comédia' }]);
  });
});
