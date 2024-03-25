// PanelTable.js

import React, { useState, useEffect } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../firebase'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import SearchBar from '../searchBar'

export default function PanelTable() {
  const [stdListData, setStdListData] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const q = query(collection(db, 'attendance'))
        const querySnapshot = await getDocs(q)
        const tempArr = []
        querySnapshot.forEach((doc) => {
          tempArr.push({ ...doc.data(), id: doc.id })
        })
        setStdListData(tempArr)
        if (tempArr.length === 0) {
          setOpenSnackbar(true)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  const filteredData = stdListData.filter((std) =>
    std.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSnackbarClose = () => {
    setOpenSnackbar(false)
  }

  return (
    <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
      <SearchBar handleSearch={handleSearch} />
      <div style={{ marginTop: '20px' }}>
        {loading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <>
            {filteredData.length === 0 && (
              <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
              >
                <MuiAlert
                  elevation={6}
                  variant="filled"
                  severity="info"
                  onClose={handleSnackbarClose}
                >
                  No users found
                </MuiAlert>
              </Snackbar>
            )}
            {filteredData.length > 0 && (
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Full Name</TableCell>
                      <TableCell align="right">Course</TableCell>
                      <TableCell align="right">Check In</TableCell>
                      <TableCell align="right">Check Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((std) => (
                      <TableRow key={std.id}>
                        <TableCell component="th" scope="row">
                          {std.name}
                        </TableCell>
                        <TableCell align="right">{std.cousre}</TableCell>
                        <TableCell align="right">{std.checkIn}</TableCell>
                        <TableCell align="right">{std.checkOut}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </div>
    </div>
  )
}
