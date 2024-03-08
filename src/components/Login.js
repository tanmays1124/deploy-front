import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import login from "../images/login.jpg";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import ip from "../ipaddr.js";
import Cookies from "js-cookie";
import Loading from "./Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Login = ({ token, setToken, setUser, setLogged, setUserId }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [show, setShow] = useState("fade");
  const [tokenUpdated, setTokenUpdated] = useState(false);
  const [loading, setLoading] = useState(false)
  const [isSuperUser, setIsSuperUser] = useState(false)
  const navigate = useNavigate();


  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  

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
    setLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://${ip}:8000/api/login/`,
        formData
      );
      console.log(response.data);
      setToken(response.data.jwt);
      setIsSuperUser(response.data.is_superuser)
      localStorage.setItem("token", response.data.jwt);
      Cookies.set("jwt", response.data.jwt, { expires: 7, secure: false });
      sessionStorage.setItem('jwt', response.data.jwt)
      console.log("Session Storage",sessionStorage.getItem('jwt'))
      

      localStorage.setItem("userId", response.data.id);
      // localStorage.setItem("username", response.data.username);
      // setUser(response.data.username);
      // setLogged(true);
      // setUserId(response.data.id);
    } catch (err) {
      setLoading(false);
      setErrorMessage("Invalid credentials!");
      setShow("show");
      // handleShake();
      console.log(err);
    }
  };

  useEffect(() => {
    // setLoading(true)
    if (token.length > 0) {
      setTokenUpdated(true);
    }
  }, [token,isSuperUser]);

  useEffect(() => {
    setLoading(false)
    if(tokenUpdated)
    {
      if(isSuperUser){
        navigate("/admin")
      }
      else{
        navigate("/home");
      }
    
    }
  }, [tokenUpdated]);

  useEffect(() => {
    setToken("");
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <>
      <div
        className={`alert alert-danger d-flex align-items-center ${show}`}
        id="alert1"
        role="alert"
      >
        <div>{errorMessage}</div>
      </div>
      <div className="login-image">
  <img src={login} alt="Login" />
</div>
      <div className="login">
        <h1>Login</h1>

        <form className="login-form" action="#" onSubmit={handleSubmit}>
          <input
            className="login-input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            placeholder="Username or Email"
            required="required"
          />
        <input
            className="login-input"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password"
            required="required"
          />
          <span
            className="toggle-password"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} />
            ) : (
              <FontAwesomeIcon icon={faEye} />
            )}
          </span>
          <button type="submit" className="login-btn">
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
