import { useState } from 'react'
import { Link,Routes,Route } from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import Garage from './pages/Garage'
import Login from './pages/Login'
import Register from './pages/Register'





function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/login" element={<Login userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn} setUserId={setUserId} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/garage" element={<Garage userLoggedIn={userLoggedIn} userId={userId} />} />
      <Route path="/mechanic" element={<MainMenu />} />
      <Route path="/workshop" element={<MainMenu />} />
    </Routes>
  )
}

export default App
