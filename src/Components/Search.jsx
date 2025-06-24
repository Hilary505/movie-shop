import React from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ searchItem, setSearchTerm }) => {
    return (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md p-2 z-50">
            {/* Wrapper positioned at top-right with white background */}
            <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search for a movie"
                    value={searchItem}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64 p-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                />
            </div>
        </div>
    );
};

export default Search;
