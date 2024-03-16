import { Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './Routes/ProtectedRoute'
import AuthRoute from './Routes/AuthRoute'
import FoundNot from './pages/FoundNot'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path='*' element={ < FoundNot/>} />
          <Route />
        </Route>
        <Route element={<AuthRoute />}>
          <Route index element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route />
        </Route>
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  )
}

export default App
