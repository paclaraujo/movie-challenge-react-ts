import { getMovies } from "./APIService";

const APIMovies = [
  {
    adult: false,
    backdrop_path: "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
    genre_ids: [878, 10749, 35],
    id: 792307,
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
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ results: APIMovies }),
    });

    const result = await getMovies();

    expect(result).toStrictEqual([
      {
        image: `https://media.themoviedb.org/t/p/w220_and_h330_face/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
        title: "Poor Things",
        releaseDate: new Date("2023-12-07"),
        originalLanguage: "en",
        originalTitle: "Poor Things",
        overview: "Brought back to life by an unorthodox scientist.",
        voteAverage: 7.901,
      },
    ]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api.themoviedb.org/3/discover/movie",
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

    const result = await getMovies();
    expect(result).toBe('API is down');
  });
});
