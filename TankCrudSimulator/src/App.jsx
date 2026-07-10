import { useState } from 'react'
import { Link,Routes,Route } from 'react-router-dom'
import MainMenu from './pages/MainMenu'
import Garage from './pages/Garage'





function App() {

  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/garage" element={<Garage />} />
      <Route path="/mechanic" element={<MainMenu />} />
      <Route path="/workshop" element={<MainMenu />} />
    </Routes>
  )
}

export default App
