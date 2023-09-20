import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";


/**
 * This component is the pagination component.
 */
const Pagination = ({
    totalPages,         // {integer} holds the total number of rows of data to be displayed
    currentPage,        // {integer} that holds teh current page
    setCurrentPage,     // {function} that sets the value of currentPage
    paginate            // {function} changes the contents being displayed based on the page number
}) => {

    // State handler to track the page buttons displayed
    let [num, setNum] = useState(1);


    // Getting the number of buttons to be displayed
    const pageNumbers = [];
    if (totalPages < 3) {
        // If total pages are less than 3, follow that as the number of buttons to show (1 or 2)
        for (let i=0; i < totalPages; i++) {
            pageNumbers.push({page: num + i});
        }
    } else {
        // 3 page buttons will be shown at any given time
        for (let i=0; i <= 2; i++) {
            pageNumbers.push({page: num + i});
        }
    }

    // Function that will show the succeeding page numbers.
    function nextPage () {
        // Display the immediate next page simultaneously as the next arrow is clicked
        if (currentPage < totalPages){
            paginate(++currentPage);
        }

        // Display the page number buttons
        num < totalPages-2 && setNum(++num);
    }

    // Function that will show the previous pages numbers.
    function prevPage () {
        // Display the immediate previous page simultaneously as the prev arrow is clicked
        if (currentPage > 1){
            paginate(--currentPage);
        }

        // Display the page number buttons
        num > 1 && setNum(--num);
    }

    // Function that will handle change in page numbers
    function handleClick(page) {
        paginate(page);
        setCurrentPage(page);
    }

    return (
        <div className="flex max-w-min bg-white rounded-lg font-montserrat drop-shadow">
            {/* Back arrow */}
            <button onClick={prevPage} className="rounded-lg py-0 hover:text-white hover:bg-secondary-red h-[4.85vh] px-[1vw] transition-all">
                <ChevronLeftIcon className="h-[2.75vh] w-[1.25vw] fill-current"/>
            </button>
            
            {/* Page Numbers displayed */}
            { pageNumbers.map((pg, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(pg.page)}
                    className={`h-[4.85vh] w-[2.25vw] rounded-lg px-[1vw] py-0 text-[1vw] ${currentPage === pg.page && "text-white bg-secondary-red"}`}
                >
                    {pg.page}
                </button>
            ))}
            
            {/* Next arrow */}
            <button onClick={nextPage} className="rounded-lg py-0 hover:text-white hover:bg-secondary-red h-[4.85vh] px-[1vw] transition-all">
                <ChevronRightIcon className="h-[2.75vh] w-[1.25vw] fill-current" />
            </button>
        </div>
    )
}


export default Pagination;