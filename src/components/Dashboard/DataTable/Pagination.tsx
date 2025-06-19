/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactPaginate from 'react-paginate';
//css file
import classes from './pagination.module.css'

interface Props {
    itemsPerPage : number,
    total : number | undefined,
    handlePage : (page : number) => void,
}

// Add react paginate library for a flexible interface and easy user experience

export default function PaginatedItems({ itemsPerPage , total  , handlePage  } : Props) {

  const pageCount = total ? Math.ceil(total / itemsPerPage) : 0;

  // Invoke when user click to request another page
  const handlePageClick = (e: { selected: number }) => {
    handlePage(e.selected+1);
  };

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel= " >>"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="<< "
        renderOnZeroPageCount={null}
        containerClassName={classes['container']}
        pageLinkClassName={classes['page-link']}
        activeLinkClassName={classes['active-link']}
        breakClassName={classes['break']}
        breakLinkClassName={classes['break-link']}
        previousLinkClassName={classes['previous-link']}
        nextLinkClassName={classes['next-link']}
      />  
    </>
  );
}
