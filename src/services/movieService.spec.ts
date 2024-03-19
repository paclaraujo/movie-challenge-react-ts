import { getMovieGenres, getMoviesDetails } from "./movieService";

const APIMoviesGenres = [
  {
    id: 1,
    name: 'Action'
  },
  {
    id: 2,
    name: 'Drama'
  },
];

const movie = {
  id: 792307,
  adult: false,
  backdrop_path: "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
  genres: [{
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 35,
    "name": "Comedy"
  }],
  original_language: "en",
  original_title: "Poor Things",
  overview: "Brought back to life by an unorthodox scientist.",
  popularity: 1968.226,
  poster_path: "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
  release_date: "2023-12-07",
  title: "Poor Things",
  video: false,
  vote_average: 7.901,
  vote_count: 2183,
};

describe("getMovieGenres", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return movie genres array", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ genres: APIMoviesGenres }),
    });

    const result = await getMovieGenres();

    expect(result).toStrictEqual(APIMoviesGenres);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/genre/movie/list",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer token",
          accept: "application/json",
        },
      }
    );
  });

  it('should return an error if fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue('API is down');

    const result = await getMovieGenres();
    expect(result).toBe('API is down');
  });
});


describe("getMoviesDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return movie details array", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(movie),
    });

    const result = await getMoviesDetails(1);

    expect(result).toStrictEqual({
      id: 792307,
      image: `https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
      title: "Poor Things",
      releaseDate: new Date("2023-12-07"),
      originalLanguage: "en",
      originalTitle: "Poor Things",
      overview:  "Brought back to life by an unorthodox scientist.",
      voteAverage: 7.901,
      genres: ["Drama", "Thriller", "Comedy"]
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/movie/1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer token",
          accept: "application/json",
        },
      }
    );
  });

  it('should return an error if fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue('API is down');

    const result = await getMoviesDetails(1);
    expect(result).toBe('API is down');
  });
});
