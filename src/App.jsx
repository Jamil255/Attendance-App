import { Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AuthRoute from './Routes/AuthRoute'
import AdminProtectedRoute, { StdProtectedRoute } from './Routes/ProtectedRoute'
import Portal from './pages/Portal'
const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route index element={<Login />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<StdProtectedRoute />}>
          <Route path="/portal" element={<Portal />} />
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
