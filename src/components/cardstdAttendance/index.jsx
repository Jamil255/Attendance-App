import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import ToastAlert from '../../utills/toast'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
)
export default function StdCard({ userData, setRefresh, refresh }) {
  const handlerCheckIN = async () => {
    try {
      let uid = localStorage.getItem('uid')
      const checkIn =
        new Date().toDateString() + '  ' + new Date().toLocaleTimeString()
      await updateDoc(doc(db, 'user', uid), {
        checkIn: checkIn,
      })
      setRefresh(!refresh)
      ToastAlert('Check In Update', 'success')
    } catch (error) {
      console.error('Error updating document:', error)
      ToastAlert(error.message || error.code, 'error')
    }
  }
  const handlerCheckOut = async () => {
    try {
      let uid = localStorage.getItem('uid')
      const checkOut =
        new Date().toDateString() + '  ' + new Date().toLocaleTimeString()
      await updateDoc(doc(db, 'user', uid), {
        checkOut: checkOut,
      })
      addDoc(collection(db, 'attendance'), {
        uid: userData.id,
        name: userData.name,
        checkIn: userData.checkIn,
        checkOut: checkOut,
        cousre: userData.cousre,
      })
      setRefresh(!refresh)
      ToastAlert('Updated check out', 'success')
    } catch (error) {
      ToastAlert(error.message || error.code, 'error')
    }
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 4 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} component={'h6'} gutterBottom>
          ID:{userData?.id}
        </Typography>
        <Typography variant="h6">Course:{userData?.cousre}</Typography>

        <Typography variant="h6">
          Check In:{userData?.checkIn || '00.00.00'}
        </Typography>
        <Typography variant="h6">
          Check Out:{userData?.checkOut || '00.00.00'}
        </Typography>
      </CardContent>
      <CardActions>
        {userData?.checkIn ? (
          <Button variant="contained" onClick={handlerCheckOut}>
            Check Out
          </Button>
        ) : (
          <Button variant="contained" onClick={handlerCheckIN}>
            Check In
          </Button>
        )}
      </CardActions>
    </Card>
  )
}
