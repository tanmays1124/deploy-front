import { Link,useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

// import './Landing.css';
import bg from "../images/landing.jpg";
import ip from '../ipaddr.js'

const Landing = () => {
  const [isHoveredlog, setIsHoveredlog] = useState(false);
  const [isHoveredsign, setIsHoveredsign] = useState(false);

  const handleMouseEnterlog = () => {
    setIsHoveredlog(true);
  };

  const handleMouseLeavelog = () => {
    setIsHoveredlog(false);
  };

  const handleMouseEntersign = () => {
    setIsHoveredsign(true);
  };

  const handleMouseLeavesign = () => {
    setIsHoveredsign(false);
  };



  const styles = {
  // ... (existing styles)
      
        body: {
          margin: 0,
          padding: 0,
          overflowX: 'hidden', // This prevents horizontal scrolling
        },

      
    container: {
      fontFamily: "'Agbalumo', system-ui",
      fontFamily: "'Poppins', sans-serif",
      margin: "0",
      padding: "0",
      zIndex: "-2",
      width: "100vw",
      height: "100vh",
      backgroundImage: "url(" + bg + ")",
      backgroundSize: "cover",
      overflowY: "hidden",
      opacity: "0.8",
    },
    "center-text": {
      textAlign: "center",
      height: "100%",
      padding: "80px",
      /* border: 2px solid green; */
      marginTop: "150px",
      fontSize: "larger",
      transition: "background-color 0.3s, color 0.3s",
      color: "#FFFFFF",
    },

    header: {
      backgroundColor: "#ffffff00",
      padding: "15px",
      color: "black",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      
      
    },
    logo: {
      fontSize: "1.5em",
      fontWeight: "bold",
      marginRight: "auto",
      textDecoration: "none",
      // color: "rgb(0, 0, 0)",
      color: "white",
    },

    "nav-buttons": {
      display: "flex",
      alignItems: "center",
      backgroundColor:"#ffffff00"
    },

    login: {
      backgroundColor: isHoveredlog ? "#e0e0e0" : "#ffffff00",
      textDecoration: "none",
      color: isHoveredlog ? "#333" : "white",
      padding: "10px",
      marginLeft: "15px",
      border: isHoveredlog ? "3px solid black" : "3px solid black",
      borderRadius: "5px",
      transition: "background-color 0.3s, color 0.3s, border 0.3s",
    },

    signup: {
      backgroundColor: isHoveredsign ? "#e0e0e0" : "#ffffff00",
      textDecoration: "none",
      color: isHoveredsign ? "#333" : "white",
      padding: "10px",
      marginLeft: "15px",
      border: isHoveredsign ? "3px solid black" : "3px solid black",
      borderRadius: "5px",
      transition: "background-color 0.3s, color 0.3s, border 0.3s",
    },
  };


  document.body.style.height = "100%";
  document.documentElement.style.height = "100%";
  
  document.body.style.margin = styles.body.margin;
document.body.style.padding = styles.body.padding;
document.body.style.overflowX = styles.body.overflowX;

document.documentElement.style.margin = styles.body.margin;
document.documentElement.style.padding = styles.body.padding;
document.documentElement.style.overflowX = styles.body.overflowX;

const navigate = useNavigate()

useEffect(()=>{
  const tkn = localStorage.getItem('token');
  if(tkn) {
    navigate('/home')
  }
  // else{
  //   navigate('/login')
  // }

},[])

  return (
    <>
      <div className="cont" style={styles["container"]}>
        <header style={styles["header"]}>
          <Link id="logo" style={styles["logo"]} to="#">
            QuizViz
          </Link>
          <div id="nav-buttons" style={styles["nav-buttons"]}>
            <Link
              id="login"
              style={styles["login"]}
              to="/login"
              onMouseEnter={handleMouseEnterlog}
              onMouseLeave={handleMouseLeavelog}
            >
              Login
            </Link>
            <Link
              id="signup"
              style={styles["signup"]}
              to="/register"
              onMouseEnter={handleMouseEntersign}
              onMouseLeave={handleMouseLeavesign}
            >
              Sign Up
            </Link>
          </div>
        </header>

        <section id="center-text" style={styles["center-text"]}>
          <h1>Welcome to QuizViz!</h1>
          <strong>
            <p>Discover and explore the world of quizzes.</p>
          </strong>
        </section>
      </div>
    </>
  );
};

export default Landing;
