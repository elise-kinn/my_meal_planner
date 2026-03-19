import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"

import Planning from "./pages/Planning"

function App() {

  return (
    <>
    <Header />

    <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Login />} />
      <Route path="/planning" element={<Planning />} />

    </Routes>

    <Footer />
    </>

  )
}

export default App
