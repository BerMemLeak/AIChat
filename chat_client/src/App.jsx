import React, { useContext }from 'react';
import { BrowserRouter, Routes, Route, Navigate,Link } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import NotFound from './components/NotFound';
import Layout from './components/Layout';
import { AuthProvider, AuthContext } from './components/AuthContext';
import UserInfo from './components/UserInfo';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      {/* <NavBar /> */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/user" element={<PrivateRoute> <UserInfo /> </PrivateRoute>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    
  );
}
const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
      <nav>
          <ul>
              {!isAuthenticated && (
                  <>
                      <li>
                          <Link to="/login">Login</Link>
                      </li>
                      <li>
                          <Link to="/register">Register</Link>
                      </li>
                  </>
              )}
              {isAuthenticated && (
                  <>
                      <li>
                          <Link to="/user">User Info</Link>
                      </li>
                      <li>
                          <Link to="/chat">Chat</Link>
                      </li>
                      <li>
                          <button onClick={logout}>Logout</button>
                      </li>
                  </>
              )}
          </ul>
      </nav>
  );
};

//функция проверки на регистрацию пользователя 
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};
export default App;
