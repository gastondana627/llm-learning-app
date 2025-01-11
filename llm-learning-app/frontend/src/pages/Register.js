  import React, {useState, useContext} from "react";
  import {AuthContext} from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';

  const Register = () => {
  const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
   const {register, isAuthenticated, loading} = useContext(AuthContext)

    const handleSubmit = async (event) => {
      event.preventDefault();
    register({userName, email, password, role});
      setUserName("");
      setEmail("");
      setPassword("");
      setRole("student");
  };
  if(isAuthenticated) {
      navigate("/dashboard")
      return null
  }
    if(loading) {
        return <div>Loading...</div>
    }
      return (
         <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
               <input
                 type="text"
                 placeholder="Username"
                 value={userName}
                 onChange={(event) => setUserName(event.target.value)}
               />
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
                <select
                  value={role}
                  onChange={(event) => setRole(event.target.value)}>
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                 </select>
              <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a> </p>
          </div>
         )
  }
  export default Register