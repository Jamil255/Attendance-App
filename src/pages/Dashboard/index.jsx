import React, { useState } from 'react'
import AdminLayout from '../../components/AdminLayout'
import {
  Autocomplete,
  Divider,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import InputField from '../../components/inputFeild'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import ToastAlert from '../../utills/toast'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { uploadFile } from '../../utills/uploadImage'
import { doc, setDoc } from 'firebase/firestore'
import DropDown from '../../components/dropdown'

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

const top100Films = [
  { label: 'web and app' },
  { label: 'Python' },
  { label: 'Java' },
  { label: 'Fultter' },
]

const Dashboard = () => {
  const [showPassword, setPasswordShow] = useState(false)
  const [fullName, setFullName] = useState('')
  const [cousre, setCousre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [stdImage, setStdImage] = useState('')
  console.log('cousre', cousre)

  const handleCourseChange = (e, value) => {
    setCousre(value?.label || '')
  }

  const handlerStd = async () => {
    if (!fullName || !email || !password || !cousre || !stdImage) {
      ToastAlert('Required Field', 'warning')
      return
    }
    try {
      const userData = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const userId = userData.user.uid
      const imageURL = await uploadFile(stdImage)
      const obj = {
        email,
        name: fullName,
        cousre,
        imageURL,
        type: 'std',
        isActive: true,
        id: userId,
      }
      await setDoc(doc(db, 'user', userId), obj)
      ToastAlert('student create', 'success')
    } catch (error) {
      ToastAlert(error.message || error.code, 'error')
    }
    setCousre('')
    setEmail('')
    setFullName('')
    setPassword('')
    setStdImage(false)
  }

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Add student</h2>
      <Divider />
      <Grid container mt={2} columnSpacing={5} rowSpacing={5}>
        <Grid item xs={12} sm={6}>
          <InputField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={top100Films}
            value={top100Films.find((option) => option.label === cousre)}
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Course" />}
            onChange={handleCourseChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
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
        <Grid item xs={12} display={'flex'}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInputt
              type="file"
              onChange={(e) => setStdImage(e.target.files[0])}
            />
          </Button>
          <Typography marginTop={1} paddingLeft={1}>
            {stdImage ? stdImage.name.slice(0, 15) : 'No file chosen'}
          </Typography>
        </Grid>
        <Grid item xs={12} marginTop={'20px'}>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            onClick={handlerStd}
          >
            ADD STUDENT
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Dashboard
