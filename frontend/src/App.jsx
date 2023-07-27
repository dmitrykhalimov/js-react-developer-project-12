import { React, useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';

import Login from './views/Login.jsx';
import Main from './views/Main.jsx';
import NotFound from './views/NotFound.jsx';
import AuthContext from './contexts/authContext.jsx';
import axios from 'axios';

import GlobalStyle from './globalStyles.js';
import useAuth from './hooks/useAuth.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('userId');
    if (token) {
      auth.logIn();
    }
  }, []);
  
  console.log(auth.loggedIn);

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

function App() {
  const auth = useAuth();

  return (
    <AuthProvider>
      <GlobalStyle />
      <BrowserRouter>
          <Routes>
            <Route path="/" element={(
              <PrivateRoute>
                <Main />
              </PrivateRoute>)}
            />
            <Route path="/login" element={<Login />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
