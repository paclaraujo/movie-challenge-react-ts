import { getMovieGenres } from "./movieService";

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
