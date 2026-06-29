import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App