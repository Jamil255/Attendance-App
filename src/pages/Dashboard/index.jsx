import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import { Divider, Grid, InputAdornment, TextField } from '@mui/material'
import InputField from '../../components/inputFeild'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import { Visibility, VisibilityOff } from '@mui/icons-material'
const VisuallyHiddenInputt = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})
const Dashboard = () => {
  const [showPassword, setPasswordShow] = useState(false)
  return (
    <>
      <AdminLayout>
        <h2 style={{ textAlign: 'center' }}>Add student</h2>
        <Divider />
        <Grid container mt={2} columnSpacing={5} rowSpacing={5}>
          <Grid item sm={6}>
            <InputField label="Full Name" />
          </Grid>
          <Grid item sm={6}>
            <InputField label="Coruse Name" />
          </Grid>
          <Grid item sm={6} marginTop={'14px'}>
            <InputField label="Email" />
          </Grid>
          <Grid item sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              id="password"
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    sx={{ cursor: 'pointer' }}
                    position="end"
                    onClick={() => setPasswordShow(!showPassword)}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item sm={12}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInputt type="file" />
            </Button>
          </Grid>
          <Grid item sm={12} marginTop={'20px'}>
            {/* <InputField label="Password" /> */}
            <Button sx={{ width: '100%' }} variant="contained">
              ADD STUDENT
            </Button>
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  )
}

export default Dashboard
