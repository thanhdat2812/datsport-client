import React, { useState } from 'react'
import './SearchBar.scss';
const SearchBar = () => {
    const [value, setValue] = useState('');

    const clearSearch = () => {

    }

    return (
        <div className="searchBar-wrap">
            <form action="">
                <input type="text" placeholder='Search Posts' />
                {value && <span onClick={clearSearch}></span>}
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar