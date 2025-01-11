  import React, {useState, useContext} from "react";
  import {AuthContext} from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';

  const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
   const {login, isAuthenticated, loading} = useContext(AuthContext)

    const handleSubmit = async (event) => {
      event.preventDefault();
      login({email, password});
      setEmail("");
      setPassword("");
     };

  if(isAuthenticated) {
      navigate("/dashboard");
      return null;
  }

  if(loading) {
  return <div>Loading...</div>
  }

      return (
         <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
               <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}
               />
              <button type="submit">Log In</button>
            </form>
            <p>Dont have an account? <a href="/register">Register</a> </p>
          </div>
         )
  }
  export default Login