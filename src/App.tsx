import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./pages/Login"
import Register from "./pages/Register"

function App() {

  return (
    <>
    <Header />

    <Routes>
      <Route path="/register" element={<Register />}/>
      <Route path="/" element={<Login />} />

    </Routes>

    <Footer />
    </>

  )
}

export default App
