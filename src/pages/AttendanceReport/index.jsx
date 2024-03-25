import React, { useEffect, useState } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import StdCard from '../../components/cardstdAttendance'

const AttendanceReport = () => {
  const [userData, setUserData] = useState()
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      let uid = localStorage.getItem('uid')
      const userListData = await getDoc(doc(db, 'user', uid))
      const data = userListData.data()
      setUserData({ ...data, id: userListData.id })
    }
    fetchData()
  }, [refresh])
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
      <StdCard userData={userData} setRefresh={setRefresh} refresh={refresh} />
    </>
  )
}

export default AttendanceReport
