  import React, { createContext, useState, useEffect } from 'react';
  import axios from 'axios';
  const AuthContext = createContext();

  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);


  const login = async (credentials) => {
      try {
           const response = await axios.post('http://localhost:5000/api/users/login', credentials);
          const {user: userData, token: userToken} = response.data;
          setUser(userData);
          setToken(userToken)
           localStorage.setItem("token", userToken);
           setIsAuthenticated(true)
      } catch (err) {
      console.log(err);
      }
  };
    const register = async (credentials) => {
      try {
         const response = await axios.post('http://localhost:5000/api/users/register', credentials);
        const {user: userData, token: userToken} = response.data;
        setUser(userData);
        setToken(userToken);
           localStorage.setItem("token", userToken);
           setIsAuthenticated(true)
      } catch (err) {
          console.log(err);
      }
    }

    const logout = () => {
        setUser(null)
        setToken(null);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
    };

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if(token) {
      try {
          const response = await axios.get('http://localhost:5000/api/users/me', {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
      setUser(response.data);
      setToken(token);
      setIsAuthenticated(true)
      } catch(err) {
      console.log(err);
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchUser();
  }, []);
    const contextValue = {
    user,
        token,
    isAuthenticated,
      loading,
        login,
        register,
        logout
    };
    return (
      <AuthContext.Provider value={contextValue}>
        {children}
      </AuthContext.Provider>
    );
  };
  export { AuthContext };
  export default AuthProvider