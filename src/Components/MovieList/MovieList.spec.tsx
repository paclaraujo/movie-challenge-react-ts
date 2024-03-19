import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import MovieList from './MovieList';
import { MemoryRouter } from 'react-router-dom';

const movies = [
  {
    id: 1,
    image: `https://example.com/movie1.jpg`,
    title: "Movie 1",
    releaseDate: new Date("2023-12-07"),
    originalLanguage: "en",
    originalTitle: "Movie 1",
    overview:  "Description Movie 1",
    voteAverage: 7.901,
    genres: ['Action']
  },
  {
    id: 2,
    image: `https://example.com/movie2.jpg`,
    title: "Movie 2",
    releaseDate: new Date("2023-12-07"),
    originalLanguage: "en",
    originalTitle: "Movie 2",
    overview:  "Description Movie 2",
    voteAverage: 7.901,
    genres: ['Action']
  },
]

describe("Movie Card component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <MovieList movies={movies}/>
      </MemoryRouter>
    );
  })

  it('renders movies posters', () => {
    const posters = screen.queryAllByRole('img');

    expect(posters[0]).toHaveAttribute("src", movies[0].image);
    expect(posters[1]).toHaveAttribute("src", movies[1].image);
  });

  it('renders movies infos', () => {
    const liItems = screen.queryAllByRole('listitem');

    expect(liItems[0]).toHaveTextContent(`${movies[0].title} | 2023`);
    expect(liItems[1]).toHaveTextContent("★ 7.9");
    expect(liItems[2]).toHaveTextContent("Action");

    expect(liItems[3]).toHaveTextContent(`${movies[1].title} | 2023`);
    expect(liItems[4]).toHaveTextContent("★ 7.9");
    expect(liItems[5]).toHaveTextContent("Action");
  });
})