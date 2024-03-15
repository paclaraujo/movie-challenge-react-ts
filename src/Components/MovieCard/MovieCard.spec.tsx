import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import MovieCard from './MovieCard';

const movie = {
  image: `https://media.themoviedb.org/t/p/w220_and_h330_face/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg`,
  title: "Poor Things",
  releaseDate: new Date("2023-12-07"),
  originalLanguage: "en",
  originalTitle: "Poor Things",
  overview:  "Brought back to life by an unorthodox scientist.",
  voteAverage: 7.901, 
}

describe("Movie Card component", () => {
  beforeEach(() => {
    render(<MovieCard movie={movie}/>);
  })

  it('renders movie poster', () => {
    const poster = screen.queryByRole('img');

    expect(poster).toHaveAttribute("src", movie.image);
  });

  it('renders movie infos', () => {
    const liItems = screen.queryAllByRole('listitem');

    expect(liItems[0]).toHaveTextContent("Poor Things");
    expect(liItems[1]).toHaveTextContent("★ 7.9");
    expect(liItems[2]).toHaveTextContent("2023");
  });
})