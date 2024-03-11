import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Bounce, ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import SignUp from './pages/Signup'

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
        </Routes>
      </Router>

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
