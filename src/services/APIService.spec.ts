import { getMovies } from "./APIService";

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

const APIMovies = [
  {
    id: 792307,
    adult: false,
    backdrop_path: "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
    genre_ids: [1, 2],
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
  },
];

describe("getMovies", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return a formated response", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: () => Promise.resolve({ page: 1, total_pages: 10, results: APIMovies }),
    }).mockResolvedValueOnce({
      json: () => Promise.resolve({ genres: APIMoviesGenres }),
    });

    const result = await getMovies({filters: {page: 1}});

    expect(result).toStrictEqual({
      metaData: {
        pagination: {
          currentPage: 1,
          totalPages: 10
        },
      },
      movies: [{
        id: 792307,
        image: `https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
        title: "Poor Things",
        releaseDate: new Date("2023-12-07"),
        originalLanguage: "en",
        genres: ["Action", "Drama"],
        originalTitle: "Poor Things",
        overview: "Brought back to life by an unorthodox scientist.",
        voteAverage: 7.901,
      }],
  });
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/discover/movie?page=1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer token",
          accept: "application/json",
        },
      }
    );
  });

  it("should call endpoint with filter queries", async () => {
    global.fetch = jest.fn().mockResolvedValue({});

    await getMovies({filters: {page: 1, genreId: 1}});

    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/discover/movie?page=1&with_genres=1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer token",
          accept: "application/json",
        },
      }
    );
  });

  it("should call endpoint with sort queries", async () => {
    global.fetch = jest.fn().mockResolvedValue({});

    await getMovies({filters: {page: 1, sortBy: "1"}});

    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/discover/movie?page=1&sort_By=1",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer token",
          accept: "application/json",
        },
      }
    );
  });

  it("should call endpoint with sort and filter queries", async () => {
    global.fetch = jest.fn().mockResolvedValue({});

    await getMovies({filters: {page: 1, sortBy: "1", genreId: 1}});

    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/discover/movie?page=1&with_genres=1&sort_By=1",
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

    const result = await getMovies({filters: {page: 1}});
    expect(result).toBe('Error: API is down');
  });
});
