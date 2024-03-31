import React, { useState } from 'react'
import { Box } from '@mui/material'
import PanelTable from '../../components/PanelTable'

const AdminAttendancePanel = () => {
  return (
    <>
      <Box marginTop={3}>
        <h6
          style={{
            marginBottom: '18px',
            fontSize: '18px',
          }}
        >
          Attendance
        </h6>
        <PanelTable />
      </Box>
    </>
  )
}

export default AdminAttendancePanel
