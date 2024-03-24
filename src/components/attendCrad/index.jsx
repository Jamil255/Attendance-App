import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
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
const handlerCheckIN = async () => {
  try {
    let uid = localStorage.getItem('uid')
    const checkIn =
      new Date().toDateString() + '' + new Date().toLocaleTimeString()
    const docRef = doc(db, 'user', uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      await updateDoc(docRef, {
        checkIn: checkIn,
      })
      ToastAlert('Updated  checkin', 'success')
    } else {
      console.log('Document does not exist.')
      // Handle this case gracefully
    }
  } catch (error) {
    console.error('Error updating document:', error)
    ToastAlert(error.message || error.code, 'error')
  }
}

export default function AttndCard({ userData }) {
  return (
    <Card sx={{ minWidth: 275, marginTop: 4 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }} component={'h6'} gutterBottom>
          {/* id:{userData?.id} */}
        </Typography>
        <Typography variant="h6">Course:{userData?.cousre}</Typography>

        <Typography variant="h6">CheckIn:{userData?.checkIn}</Typography>
        <Typography variant="h6">checkout:checkOut</Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={handlerCheckIN}>
          Check In
        </Button>
      </CardActions>
    </Card>
  )
}
