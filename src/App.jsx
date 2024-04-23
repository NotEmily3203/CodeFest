import './App.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn'
import DeleteAccount from './routes/DeleteAccount';
import ChangePassword from './routes/ChangePassword';
import Home from './routes/Home';
import About from './routes/About';
import Saved from './routes/Saved';
import Travel from './routes/Travel';
import FlightSearchComponent from './routes/PriceEstimator';

function App() {
  return (

    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/prices" element={<FlightSearchComponent />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App