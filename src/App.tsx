import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import Landing from "./Landing.tsx"; //home page
import Webcam from "./Webcam";
import Upload from "./Upload";
function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" index element={<Landing/>} />
        <Route path="/webcam" element={<Webcam/> } />
        <Route path="/upload" element={<Upload/>} />
        {/*<Route path="/sign-in" element={loggedIn ? <Profile retrieveDatabase={retrieveDatabase} user={user} updateUser={updateUser} deleteUser={deleteUser} setLoggedIn={setLoggedIn} setTriggeredLogout={setTriggeredLogout} /> : <SignIn retrieveDatabase={retrieveDatabase} user={user} setLoggedIn={setLoggedIn} />} />
        <Route path="/profile" element={loggedIn ? <Profile retrieveDatabase={retrieveDatabase} user={user} updateUser={updateUser} deleteUser={deleteUser} setLoggedIn={setLoggedIn} setTriggeredLogout={setTriggeredLogout} /> : <NotFound />} />
        <Route path='*' element={<NotFound />} />*/}
      </Routes>
    </Router>
  )
}

export default App
