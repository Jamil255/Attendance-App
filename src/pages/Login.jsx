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
import { InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import 'react-toastify/dist/ReactToastify.css'
import { auth } from '../firebase'
import ToastAlert from '../utills/toast'
import { ToastContainer } from 'react-toastify'
const defaultTheme = createTheme()
const Login = () => {
  const navigate = useNavigate()
  const [showPassword, setPasswordShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSigninSuccessful, setIsSigninSuccessful] = useState(false)

  const handleClick = () => {
    navigate('/signup')
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email || !password) {
      ToastAlert('Missing input field', 'warning')
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        setIsSigninSuccessful(true) // Set state to successful
        ToastAlert('user successfully signup', 'success')

        // Navigate after a brief delay to ensure toast visibility
        setTimeout(() => navigate('/signup'), 2000) // 1 second delay (adjust as needed)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        ToastAlert(errorMessage, 'error')
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <ToastContainer />
            <Grid container justifyContent={'center'}>
              <Grid item>
                <Link
                  variant="body2"
                  onClick={handleClick}
                  sx={{ cursor: 'pointer' }}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
export default Login
