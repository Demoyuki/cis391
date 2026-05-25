import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from 'react-router-dom';
import AboutThisSite from './AboutThisSite';
import ContactUs from './ContactUs';
import LoginPage from './LoginPage';
import User from './User';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute';

const App = () => {
  // Tracks whether the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Called by LoginPage via props — sets logged-in state to true
  // then navigates to the page the user originally requested
  const handleLogin = (from, navigate) => {
    setIsLoggedIn(true);
    console.log('in handleLogin from', from);
    console.log('in handleLogin navigate', navigate);
    navigate(from, { replace: true });
  };

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<span></span>} />
          <Route
            path='/about'
            element={
              <PrivateRoute authorized={isLoggedIn}>
                <AboutThisSite />
              </PrivateRoute>
            }
          />
          <Route
            path='/contact'
            element={
              <PrivateRoute authorized={isLoggedIn}>
                <ContactUs />
              </PrivateRoute>
            }
          />
          <Route
            path='/login'
            element={<LoginPage onClick={handleLogin} />}
          />
          <Route path='/user/:username' element={<User />} />
        </Routes>
        <h5>Some friends of mine</h5>
        <ul>
          <li><Link to='user/Mary'>Mary</Link></li>
          <li><Link to='/user/Justine'>Justine</Link></li>
          <li><Link to='/user/Brianna'>Brianna</Link></li>
          <li><Link to='/user/David'>David</Link></li>
        </ul>
      </BrowserRouter>
    </>
  );
};

export default App;
