import { formatMovie } from "./transformers";

describe("formatMovie", () => {
  it("should format movie API infos according to Movie type", () => {
    const APIMovie = {
      "adult": false,
      "backdrop_path": "/bQS43HSLZzMjZkcHJz4fGc7fNdz.jpg",
      "genre_ids": [
        878,
        10749,
        35
      ],
      "id": 792307,
      "original_language": "en",
      "original_title": "Poor Things",
      "overview": "Brought back to life by an unorthodox scientist.",
      "popularity": 1968.226,
      "poster_path": "/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg",
      "release_date": "2023-12-07",
      "title": "Poor Things",
      "video": false,
      "vote_average": 7.901,
      "vote_count": 2183
    }

    const formatedMovie = formatMovie(APIMovie);
    expect(formatedMovie).toStrictEqual({
      image: `https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
      title: "Poor Things",
      releaseDate: new Date("2023-12-07"),
      originalLanguage: "en",
      originalTitle: "Poor Things",
      overview:  "Brought back to life by an unorthodox scientist.",
      voteAverage: 7.901,
    })
  })
})
