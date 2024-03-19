import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import MovieCard from "./MovieCard";

const movie = {
  id: 1,
  image: `https://example.com/movie1.jpg`,
  title: "Movie 1",
  releaseDate: new Date("2023-12-07"),
  originalLanguage: "en",
  originalTitle: "Movie 1",
  overview: "Description Movie 1",
  voteAverage: 7.901,
  genres: ['Action']
};

describe("Movie Card component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MovieCard movie={movie} />
      </MemoryRouter>
    );
  });

  it("renders movie poster", () => {
    const poster = screen.queryByRole("img");

    expect(poster).toHaveAttribute("src", movie.image);
  });

  it("renders movie infos", () => {
    const liItems = screen.queryAllByRole("listitem");

    expect(liItems[0]).toHaveTextContent(`${movie.title} | 2023`);
    expect(liItems[1]).toHaveTextContent("★ 7.9");
    expect(liItems[2]).toHaveTextContent("Action");
  });
});
