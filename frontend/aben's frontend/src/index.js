import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import ReactDOM from 'react-dom'

import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Home from './Components/Home';
import {Container} from 'react-bootstrap'

function App () {

    
    return (
        <Router>
          <Container className = "d-flex align-item-center justify-content-center" style = {{minHeight:"100vh"}}>
          <div className='w-100' style = {{maxWidth: "400vh"}}>
            <Routes>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/signup" element={<SignUp/>}/>
                <Route exact path="/login" element={<Login/>}/>
      
            </Routes>
          </div>
          </Container>
        </Router>
    )
}


ReactDOM.render(<App/>,document.getElementById('root'))