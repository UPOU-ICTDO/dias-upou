import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';
import { SearchIcon } from '@heroicons/react/solid';

/**
 * This component contains a search bar.
 */
const SearchBar = ({
    searchValue,        // {string} state that will handle the value entered in the input
    changeHandler,      // {function} will be used to handle onChange event
    ...props            // will catch any other props
}) => {

    return (
        <div className="flex space-x-1 z-50">
            {/* Input field */}
            <input
                className="block w-full px-4 lg:px-5 fhd:px-[1vw] py-1 sm:py-2 fhd:py-[0.25vw] text-sm sm:text-lg lg:text-[1vw] 
                    font-inter text-white bg-gray-200 border rounded-xl focus:text-dark-blue focus:bg-white
                    focus:border-light-blue focus:ring-dark-blue focus:outline-none focus:ring focus:ring-opacity-40"
                name="search"
                type="text"
                value={searchValue}
                onChange={changeHandler}
                {...props}
            />
            {/* Wrapping the search icon with a tooltip */}
            <Tippy content={<span>Search</span>}>
                <button className="-center px-4 lg:px-5 fhd:px-[1vw] py-2 text-dark-blue bg-light-blue rounded-xl">
                    <SearchIcon className="w-5 sm:w-7 fhd:w-[1.5vw] rounded cursor-pointer h-11/12" />
                </button>
            </Tippy>
        </div>
    );
};


export default SearchBar;