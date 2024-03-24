import React, { useEffect, useState } from 'react'
import AttndCard from '../../components/attendCrad'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const AttendanceReport = () => {
  const [userData, setUserData] = useState()
  useEffect(() => {
    const fetchData = async () => {
      let uid = localStorage.getItem('uid')
      const userListData = await getDoc(doc(db, 'user', uid))
      const data = userListData.data()
      setUserData(data)
    }
    fetchData()
  }, [])
  console.log(userData)
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>AttendanceReport</p>
      </div>
          <AttndCard userData={ userData} />
    </>
  )
}

export default AttendanceReport
