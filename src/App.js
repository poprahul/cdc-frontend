import React from 'react'
import Navbar from './Navbar';
import Home from './Home';
import Success from './Success';
import Error from './Error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {

  return (
    <div className="container">
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/success' element={<Success/>}/>
              <Route exact path='/error' element={<Error/>}/>
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  )
}
