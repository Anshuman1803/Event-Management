// SearchComponent.js
import React from 'react';
import searchStyle from './search.module.css';

const SearchComponent = ({ searchTerm, setSearchTerm, placeholder }) => {

  return (
    <div className={searchStyle.searchContainer}>
      <input
        type="text"
        id='searchInput'
        name='searchInput'
        placeholder={placeholder || "Search..."}
        value={searchTerm}
        onChange={setSearchTerm}
        className={searchStyle.searchInput}
        autoComplete='off'
        autoFocus={true}
      />
    </div>
  );
};

export default SearchComponent;