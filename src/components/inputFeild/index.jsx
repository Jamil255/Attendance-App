import { TextField } from '@mui/material'
import React from 'react'

const InputField = ({ label = 'outlined', type = 'text', onChange, value }) => {
  return (
    <TextField
      type={type}
      label={label}
      variant="outlined"
      sx={{ width: '100%' }}
      onChange={onChange}
      value={value}
    />
  )
}

export default InputField
