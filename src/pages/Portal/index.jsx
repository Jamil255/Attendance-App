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
} from '@mui/material'

const Portal = () => {
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const uid = localStorage.getItem('uid')
        const docRef = doc(db, 'user', uid)
        const docSnap = await getDoc(docRef)
        const data = docSnap.data()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data from Firebase:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ marginTop: '40px' }}>
      {userData && (
        <>
          {userData?.imageURL ? (
            <img src={userData.imageURL} alt="" width={100} height={100} />
          ) : (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpHp2DGglYZCHX3QxCvjk-Yg6fmQ6PJAu1W0r_4txTxw&s"
              width={100}
              height={100}
              alt="default"
            />
          )}

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
