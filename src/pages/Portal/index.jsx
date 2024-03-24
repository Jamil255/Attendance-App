import React, { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material'

const Portal = () => {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stdImages, setStdImages] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem('uid')
        const docRef = doc(db, 'user', uid)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data()
        setUserData(data)
        setStdImages(data.imageURL)
      } catch (error) {
        console.error('Error fetching user data from Firebase:', error)
      } finally {
        setLoading(false) // Set loading to false regardless of success or failure
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ marginTop: '40px' }}>
      {loading && (
        <div
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            flexDirection: 'column-reverse',
            height: '90vh',
            marginTop: 20,
          }}
        >
          <CircularProgress />
        </div>
      )}
      {!loading && userData && (
        <>
          <img
            src={stdImages || '/placeholder.jpeg'}
            alt=""
            width={100}
            height={100}
          />
          <Divider />
          <TableContainer component={Paper} sx={{ marginTop: 3 }}>
            <Table align="left">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <strong>Name:</strong>
                  </TableCell>
                  <TableCell>{userData.name}</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <strong>Course:</strong>
                  </TableCell>
                  <TableCell>{userData.cousre}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>ID:</strong>
                  </TableCell>
                  <TableCell>{userData.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <strong>Email:</strong>
                  </TableCell>
                  <TableCell>{userData.email}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  )
}

export default Portal
