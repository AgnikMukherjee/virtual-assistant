import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Home from './pages/Home'
import Customize from './pages/Customize'
import { userDataContext } from './context/UserContext'
import Customize2 from './pages/Customize2'

const App = () => {
  const {userData, setUserData} = useContext(userDataContext)
  return (
    <Routes>
      <Route path='/'element={(userData?.assistantImage && userData.assistantName )? <Home/> : <Navigate to={"/customize-img"} />} />
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to={"/"} />} />
      <Route path='/signin' element={ !userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/customize-img' element={ userData ?<Customize /> : <Navigate to={"/signup"} />} />
      <Route path='/customize-name' element={ userData ?<Customize2 /> : <Navigate to={"/signup"} />} />

      {/* for testing */}
      {/* <Route path='/'element={<Home/>} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={  <SignIn /> } />
      <Route path='/customize-img' element={<Customize /> } />
      <Route path='/customize-name' element={ <Customize2 /> } /> */}

    </Routes>
  )
}

export default App