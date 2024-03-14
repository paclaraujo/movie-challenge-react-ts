import { useState } from 'react';
import './Pagination.css';

interface Props {
  currentPage: number;
  totalPages: number;
  onSelectPage: (pageNumber: number) => void;
}

const Pagination = ({ currentPage, totalPages, onSelectPage } : Props) => {
  const setPagination = () => {
    if(currentPage >=1 && currentPage <= 4){
      return getPagesArr(1)
    } else {
      return getPagesArr(currentPage - 3)
    }
  }

  const getPagesArr = (initialPage: number) => Array.from({length: 4}, (_, i) => i + initialPage)
  const [pages, setPages] = useState(setPagination())


  const pageBack = () => {
    const updatePages = getPagesArr(pages[2])
    setPages(updatePages)
  }

  const pageNext = () => {
    const updatePages = getPagesArr(pages[1])
    setPages(updatePages)
  }

  return <div className='pagination'>
    <button className='paggination__back' disabled={ currentPage -4 <= 0 } onClick={pageBack}>⮜</button>
    {pages.map((pageNumber) => (
        <button className={`${currentPage=== pageNumber && 'active'} paggination__button`} onClick={() => onSelectPage(pageNumber)} key={pageNumber}>{pageNumber}</button>
      ))}
    <button className='paggination__next' disabled={ currentPage + 4 >= totalPages } onClick={pageNext}>⮞</button>
  </div>
};

export default Pagination;