import { createBrowserRouter } from "react-router-dom";
import HomePage from "../Pages/Home/Home";
import MovieDetails from "../Pages/MovieDetails/MovieDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/movie",
    element: <MovieDetails />,
  },
]);