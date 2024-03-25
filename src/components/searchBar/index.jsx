// SearchBar.js

import React from 'react'
import TextField from '@mui/material/TextField'

const SearchBar = ({ searchBarHeight, setSearchBarHeight, handleSearch }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 80,
        right: 0,
        padding: '20px',
        transition: 'height 0.3s ease-in-out',
        height: searchBarHeight,
        overflow: 'hidden',
      }}
    >
      <TextField
        label="Search by Full Name"
        variant="outlined"
        onChange={handleSearch}
        fullWidth
      />
    </div>
  )
}

export default SearchBar
