import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { CircularProgress, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { auth, db } from '../../firebase'
import ToastAlert from '../../utills/toast'
import { doc, getDoc } from 'firebase/firestore'

const defaultTheme = createTheme()

const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setPasswordShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false) // State to track loading status

  const handleClick = () => {
    navigate('/signup')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !password) {
      ToastAlert('Missing input field', 'warning')
      return
    }

    // Set loading to true when submitting
    setLoading(true)

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const uid = userCredential.user.uid
        console.log(uid)
        const userData = await getDoc(doc(db, 'user', uid))
        console.log(userData.data(), 'userdata')
        localStorage.setItem('uid', uid)
        localStorage.setItem('user', JSON.stringify(userData.data()))

        ToastAlert('user successfully login ', 'success')
        userData?.type == 'admin' ? navigate('/dasboard') : navigate('/portal')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        ToastAlert(errorMessage, 'error')
      })
      .finally(() => {
        // Set loading to false when request is complete
        setLoading(false)
      })
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              label="Password"
              id="password"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {/* Conditionally render loader */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable button when loading
            >
              {loading ? <CircularProgress size={24} /> : 'Sign In'}
            </Button>

            <ToastContainer />
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
