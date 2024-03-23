import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function DropDown({ handleCourseFilter }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Course" />}
      onChange={handleCourseFilter}
    />
  )
}

const top100Films = [
  { label: 'web and app' },
  { label: 'Python' },
  { label: 'Java' },
  { label: 'Fultter' },
]
