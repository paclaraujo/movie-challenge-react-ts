import { useState, useEffect } from "react";
import { getMovies } from "../../services/APIService";
import MovieList from "../../Components/MovieList/MovieList";
import { Movie } from "../../models/Movie";
import Pagination from "../../Components/Pagination/Pagination";
import "./Home.css"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);


  useEffect(() => {
    setIsLoading(true);
    getMovies({filters: {page: currentPage}})
      .then((response) => {
        setMovies(response.movies)
        setIsLoading(false)
        setCurrentPage(response.metaData.pagination.currentPage)
        setTotalPages(response.metaData.pagination.totalPages)
      }).catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [currentPage])


  return <>
    {error ? 
      <p>{error}</p> : 
      isLoading ? 
        <div className="loader__container"><span className="loader" /></div> : 
        <>
          <MovieList movies={movies}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onSelectPage={(pageNumber) => {setCurrentPage(pageNumber)}} />
        </>
      }
  </>
  
};

export default Home;