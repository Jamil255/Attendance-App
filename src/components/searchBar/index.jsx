import React from 'react'
import TextField from '@mui/material/TextField'
import { Grid } from '@mui/material'

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
      <Grid xs={12} marginLeft={10}>
        <TextField
          label="Search by Full Name"
          variant="outlined"
          onChange={handleSearch}
          fullWidth
        />
      </Grid>
    </div>
  )
}

export default SearchBar
