import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { ColorRing } from 'react-loader-spinner'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button, TextField } from '@mui/material'
import ToastAlert from '../../utills/toast'

function createData(id, name, course, email, isActive) {
  return { id, name, course, email, isActive }
}

export default function MuiTable({ filterData }) {
  const [stdListData, setStdListData] = useState([])
  const [loading, setLoading] = useState(true)
  const [editIndex, setEditIndex] = useState(null)
  const [editValues, setEditValues] = useState({})
console.log(filterData);
  useEffect(() => {
    const fetchData = async () => {
      if (filterData.length > 0) {
        setStdListData(filterData)
        setLoading(false)
        setEditValues(filterData)
      } else {
        const docSnap = await getDocs(collection(db, 'user'))
        const tempArr = []
        docSnap.forEach((user) => {
          if (user.data().type !== 'admin') {
            tempArr.push({ ...user.data(), id: user.id })
          }
        })
        setStdListData(tempArr)
        setLoading(false)
        setEditValues(tempArr)
      }
    }
    fetchData()
  }, [filterData])

  const handleEditClick = (index, values) => {
    setEditIndex(index)
    setEditValues({ ...values })
  }

  const handleInputChange = (e, field) => {
    const value = e.target.value
    setEditValues((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const handleSaveClick = async (e) => {
    e.preventDefault()
    try {
      const docRef = doc(db, 'user', stdListData[editIndex].id)
      await updateDoc(docRef, editValues)
      ToastAlert('Edit successfully', 'success')
      const updatedData = stdListData.map((item, index) => {
        if (index === editIndex) {
          return { ...item, ...editValues }
        }
        return item
      })
      setStdListData(updatedData)
      setEditIndex(null)
      setEditValues({})
    } catch (error) {
      ToastAlert('Error updating document: ', error)
    }
  }

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <ColorRing
            visible={true}
            height="130"
            width="130"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#1258c9', '#1258c9', '#1258c9', '#1258c9', '#1258c9']}
          />
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell align="right">Course</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stdListData.map((std, index) => (
                <TableRow key={std.id}>
                  <TableCell component="th" scope="row">
                    {editIndex === index ? (
                      <TextField
                        value={editValues.name}
                        onChange={(e) => handleInputChange(e, 'name')}
                      />
                    ) : (
                      std.name
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editIndex === index ? (
                      <TextField
                        value={editValues.cousre}
                        onChange={(e) => handleInputChange(e, 'cousre')}
                      />
                    ) : (
                      std.cousre
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editIndex === index ? (
                      <TextField
                        value={editValues.email}
                        onChange={(e) => handleInputChange(e, 'email')}
                      />
                    ) : (
                      std.email
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editIndex === index ? (
                      <TextField
                        value={editValues.isActive}
                        onChange={(e) => handleInputChange(e, 'isActive')}
                      />
                    ) : editValues?.isActive ? (
                      'Active'
                    ) : (
                      'Active'
                    )}
                  </TableCell>

                  <TableCell align="right">
                    {editIndex === index ? (
                      <Button type="button" onClick={handleSaveClick}>
                        Save
                      </Button>
                    ) : (
                      <Button onClick={() => handleEditClick(index, std)}>
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}
