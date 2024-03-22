export type Movie = {
  id: number;
  image: string;
  title: string;
  releaseDate: Date | null;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  voteAverage: number;
  genres: string[];
}
