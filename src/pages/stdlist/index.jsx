import { Divider, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MuiTable from '../../components/MuiTable'
import DropDown from '../../components/dropdown'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const StdList = () => {
  const [filterData, setFilterData] = useState([])

  const handleCourseFilter = async (e, value) => {
    const q = query(collection(db, 'user'), where('cousre', '==', value.label))
    const tempArr = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      tempArr.push({ ...doc.data(), id: doc.id })
    })
    setFilterData(tempArr)
  }

  useEffect(() => {
    console.log(filterData)
  }, [filterData])

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} mb={2}>
        <h1>Student</h1>
        <DropDown handleCourseFilter={handleCourseFilter} />
      </Stack>
      <Divider />
      <MuiTable  filterData={filterData}  />
    </>
  )
}

export default StdList
