import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../../firebase'
import { Autocomplete, Box, Button, Grid, TextField } from '@mui/material'
import InputField from '../../components/inputFeild'
import EditIcon from '@mui/icons-material/Edit'
import { Try } from '@mui/icons-material'
import ToastAlert from '../../utills/toast'
const top100Films = [
  { label: 'web and app' },
  { label: 'Python' },
  { label: 'Java' },
  { label: 'Fultter' },
]
const EditProfile = () => {
  const [userData, setUserData] = useState('')
  const [fullName, setFullName] = useState('')
  const [cousre, setCousre] = useState('')
  const [email, setEmail] = useState('')
  const [stdImage, setStdImage] = useState(false)
  const [fieldDisabled, setFieldDisabled] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      let uid = localStorage.getItem('uid')
      const userListData = await getDoc(doc(db, 'user', uid))
      const data = userListData.data()
      setUserData(data)
      setFullName(data.name)
      setEmail(data.email)
      setCousre(data.cousre)
      setStdImage(data.imageURL)
    }
    fetchData()
  }, [])

  const saveHandler = async () => {
    try {
      let uid = localStorage.getItem('uid')
      await updateDoc(doc(db, 'user', uid), {
        name: fullName,
        cousre,
      })
      ToastAlert('edit successfully', 'success')
      setFieldDisabled(!fieldDisabled)
    } catch (error) {
      ToastAlert(error.message || error.code, 'error')
    }
  }
  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{ cursor: 'pointer' }}
        gap={1}
      >
        <h1>Profile </h1>
        <EditIcon onClick={() => setFieldDisabled(!fieldDisabled)} />
      </Box>
      <Grid container mt={2} columnSpacing={5} rowSpacing={5}>
        <Grid sm={12} marginLeft={5}>
          <Box
            component={'img'}
            src={stdImage || './placeholder.jpeg'}
            alt=""
            width={150}
            height={150}
            sx={{ objectFit: 'contain' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label="Full Name"
            value={fullName}
            disabled={fieldDisabled}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Autocomplete
            disablePortal
            disabled={fieldDisabled}
            id="combo-box-demo"
            options={top100Films}
            value={
              top100Films.find((option) => option.label === cousre) || cousre
            }
            sx={{ width: '100%' }}
            renderInput={(params) => <TextField {...params} label="Course" />}
            onChange={(e, value) => setCousre(value.label)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </Grid>

        <Grid item xs={12} marginTop={'20px'}>
          <Button
            sx={{ width: '100%' }}
            variant="contained"
            disabled={fieldDisabled}
            onClick={saveHandler}
          >
            {fieldDisabled ? 'edit' : 'save'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default EditProfile
