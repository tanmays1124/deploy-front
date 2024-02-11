import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import log from "../images/Log.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import ip from '../ipaddr.js'


const Login = ({ token, setToken, setUser, setLogged, setUserId }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState('fade')
  const navigate = useNavigate();
  

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  var shakeMe = document.getElementById('alert1')

  // const handleTogglePassword = () => {
  //   setShowPassword(!showPassword);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://${ip}:8000/api/login/`,
        formData
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
      localStorage.setItem("username", response.data.username);
      setUser(response.data.username);
      setLogged(true);
      setUserId(response.data.id);
      navigate("/home");
    } catch (err) {
      setErrorMessage("Invalid credentials!");
      setShow('show')
      handleShake()
      console.log(err);
    }
  };


  const handleShake = () =>{
    shakeMe.classList.add('shake');
    setTimeout(() => {
      shakeMe.classList.remove('shake');
    }, 500);
  }

  return (
    <>
  <div className={`alert alert-danger d-flex align-items-center ${show}`} id="alert1" role="alert">
  <div>
    {errorMessage}
  </div>
</div>
  
      <div class="login">
        


      
        <h1>Login</h1>
        <form className='login-form' action="#" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username"
            required="required"
          />
          <input
            className="login-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required="required"
          />
          <button type="submit" class="login-btn">
            Login
          </button>
        </form>
        <div className="links">
        <Link className="register" to="/register">Register?</Link>
        <Link className="forgot" to={`http://${ip}:8000/api/forgot_password/`}>Forgot Password?</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
