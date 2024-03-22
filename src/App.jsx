import { Routes, Route  } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AuthRoute from './Routes/AuthRoute'
import AdminProtectedRoute, { StdProtectedRoute } from './Routes/ProtectedRoute'
import Portal from './pages/Portal'
import FoundNot from './pages/FoundNot'
import StdList from './pages/stdlist'
import Setting from './pages/Setting'
const App = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="*" element={<FoundNot />} />
        </Route>

        <Route element={<AuthRoute />}>
          <Route path="/" exact element={<Login />} />
        </Route>

        <Route element={<AdminProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stdlist" element={<StdList />} />
        </Route>

        <Route element={<StdProtectedRoute />}>
          <Route path="/portal" element={<Portal />} />
          <Route path="/setting" element={<Setting />} />
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
