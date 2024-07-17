// SearchComponent.js
import React from 'react';
import searchStyle from './search.module.css';

const SearchComponent = ({ searchTerm, setSearchTerm,placeholder, customClass}) => {

  return (
    <div className={`${searchStyle.searchContainer} ${customClass}`}>
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