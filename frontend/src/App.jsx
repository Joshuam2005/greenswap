import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import About from "./pages/About.jsx"
import Contact from "./pages/Contact.jsx"
import Navbar from "./components/Navbar";
import Marketplace from "./pages/Marketplace.jsx";
import ListingDetails from "./pages/ListingDetails.jsx";
import CreateListing from "./pages/CreateListing.jsx";
import Register from "./pages/Register";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/listing/:id" element={<ListingDetails />} />
        <Route path="/create-listing" element={<CreateListing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App