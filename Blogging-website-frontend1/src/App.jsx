import React,{ useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { AuthRoute, GuestRoute } from './components'
import { Article, Auth, Editor, Home, Settings } from './pages'
import Navbar from './components/Navbar'
import axios from 'axios'


function App() {
  const [count, setCount] = useState(0)

  function setAuthorizationToken() {
    const jwt = window.localStorage.getItem('jwtToken');
  
    if (!jwt) {
      axios.defaults.headers.Authorization = ''; // Clear Authorization header if jwtToken is not present
      return;
    }
  
    const parsedJwt = JSON.parse(atob(jwt));
    axios.defaults.headers.Authorization = `Token ${parsedJwt.token}`;
  }
  useEffect(() => {
    setAuthorizationToken();
 
  }, []);

  return (
    <Router>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<GuestRoute />} >

              <Route path='/register' element={<Auth key = 'register' />} />
            </Route>

            {/* <GuestRoute path='/register' element={<h1>Register</h1>} /> */}

            <Route path='/login' element={<AuthRoute />}>

              <Route path='/login' element={<Auth key='login'/>} />
            </Route>
            <Route path='/settings' element={<AuthRoute />}>
              <Route path='/settings' element={<Settings/>} />
            </Route>
            <Route path='/editor' element={<Editor/>} />
            <Route path='/editor/:slug' element={<h1>Editor</h1>} />
            <Route path='/article/:slug' element={<Article/>} />
            <Route path='/profile/:username' element={<h1>Profile</h1>} />
            <Route path='/@:username' element={<AuthRoute />} >
              <Route path='/@:username' element={<h1>Profile</h1>} />
            </Route>

          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
