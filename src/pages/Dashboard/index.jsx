import React from 'react'
import AdminLayout from '../../components/AdminLayout'
import { Button, Divider, Grid } from '@mui/material'
import InputField from '../../components/inputFeild'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
const Dashboard = () => {
  return (
    <>
      <AdminLayout>
        <h2 style={{ textAlign: 'center' }}>Add student</h2>
        <Divider />
        <Grid container mt={2} columnSpacing={5} rowSpacing={5}>
          <Grid item sm={6}>
            <InputField label="Full Name" />
          </Grid>
          <Grid item sm={6}>
            <InputField label="Coruse Name" />
          </Grid>
          <Grid item sm={6}>
            <InputField label="Email" />
          </Grid>
          <Grid item sm={6}>
            <InputField label="Password" type="password" />
          </Grid>
        </Grid>
      </AdminLayout>
    </>
  )
}

export default Dashboard
