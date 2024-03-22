import { useState, useEffect } from "react";
import { getMovies } from "../../services/APIService";
import MovieList from "../../Components/MovieList/MovieList";
import { Movie } from "../../models/Movie";
import Pagination from "../../Components/Pagination/Pagination";
import Spinner from "../../Components/Spinner/Spinner";
import ListOptions from "../../Components/ListOptions/ListOptions";
import { formatGenresToOptions } from "../../utils/transformers";
import { getMovieGenres } from "../../services/movieService";
// import { useParams } from 'react-router-dom';

import "./Home.css"

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [filterOptions, setFilterOptions] = useState<Array<{
    value: number;
    label: string;
  }>>();
  const [selectedFilterOption, setSelectedFilterOption] = useState<string>('');
  const [selectedSortOption, setSelectedSortOptions] = useState<string>('');

  const sortOptions = [
    {value: 'popularity.desc', label: 'Maior Popularidade'}, 
    {value: 'popularity.asc', label: 'Menor Popularidade'}
  ]

  useEffect(() => {
    setIsLoading(true);
    let filters: {page: number, genreId: number | string | null, sortBy: string | null} = {
      page: currentPage,
      genreId: null,
      sortBy: null
    }

    if(selectedFilterOption){
      filters = {...filters, genreId: selectedFilterOption}
    }

    if(selectedSortOption && selectedSortOption){
      filters = {...filters, sortBy: selectedSortOption}
    }


    getMovies({filters: filters})
      .then((response) => {
        console.log()
        if(typeof response !== 'string'){
          setMovies(response.movies)
          setCurrentPage(response.metaData.pagination.currentPage)
          setTotalPages(response.metaData.pagination.totalPages)
        }
        setIsLoading(false)
      }).catch((err) => {
        setError(err)
        setIsLoading(false)
      })
  }, [currentPage, selectedFilterOption, selectedSortOption])

  useEffect(() => {
    getMovieGenres()
      .then((response) => {
        setFilterOptions(formatGenresToOptions(response))
      })
  }, [])

  const handleCurentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    history.pushState({page: pageNumber}, "")

  }


  return <>
    <div className="filters">
      {filterOptions && 
        <ListOptions 
          options={filterOptions} 
          onChange={(value) => {setSelectedFilterOption(value)}} 
          onClear={() => {}} 
          selectedOption={selectedFilterOption}
        />
      }
      {filterOptions && 
        <ListOptions 
          options={sortOptions} 
          onChange={(value) => {setSelectedSortOptions(value)}} 
          onClear={() => {}} 
          selectedOption={selectedSortOption}
        />
      }
    </div>
    {error ? 
      <p>{error}</p> : 
      isLoading ? 
        <Spinner /> : 
        <>
          <MovieList movies={movies}/>
          <Pagination currentPage={currentPage} totalPages={totalPages} onSelectPage={(pageNumber) => {handleCurentPage(pageNumber)}} />
        </>
      }
  </>
  
};

export default Home;