import { Route, Routes } from "react-router-dom"

import Header from "./components/Header"
import Footer from "./components/Footer"
import Login from "./pages/Login"

function App() {

  return (
    <>
    <Header />

    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Login />} />

    </Routes>

    <Footer />
    </>

  )
}

export default App
