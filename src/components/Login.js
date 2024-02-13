import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import log from "../images/Log.png";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import ip from "../ipaddr.js";
import Cookies from 'js-cookie';

const Login = ({ token, setToken, setUser, setLogged, setUserId }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState("fade");
  const [tokenUpdated, setTokenUpdated] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  var shakeMe = document.getElementById("alert1");

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
      console.log(response.data);
      setToken(response.data.jwt);
      localStorage.setItem("token", response.data.jwt);
      Cookies.set('jwt', response.data.jwt, { expires: 7, secure: false });

      localStorage.setItem("userId", response.data.id);
      // localStorage.setItem("username", response.data.username);
      // setUser(response.data.username);
      // setLogged(true);
      // setUserId(response.data.id);
    } catch (err) {
      setErrorMessage("Invalid credentials!");
      setShow("show");
      handleShake();
      console.log(err);
    }
  };

  const handleShake = () => {
    shakeMe.classList.add("shake");
    setTimeout(() => {
      shakeMe.classList.remove("shake");
    }, 500);
  };

  useEffect(() => {
    if (token.length>0) {setTokenUpdated(true);}
  }, [token]);

  useEffect(() => {
    if(tokenUpdated)
    navigate("/home");
  
  }, [tokenUpdated]);

  return (
    <>
      <div
        className={`alert alert-danger d-flex align-items-center ${show}`}
        id="alert1"
        role="alert"
      >
        <div>{errorMessage}</div>
      </div>

      <div class="login">
        <h1>Login</h1>
        <form className="login-form" action="#" onSubmit={handleSubmit}>
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
          <Link className="register" to="/register">
            Register?
          </Link>
          <Link
            className="forgot"
            to={`http://${ip}:8000/api/forgot_password/`}
          >
            Forgot Password?
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
