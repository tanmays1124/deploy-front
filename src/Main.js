import React, { useState } from 'react';
import './App.css'; // Import custom CSS
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Home from "./components/Home";
import History from "./components/History (1)";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Quizend from "./components/Quizend";
import Dashboard from "./components/Dashboard";
import Quiz from "./components/Quiz";
import Forgot from "./components/Forgot";
import Profile from "./components/Profile";
import Leaderboard from "./components/Leaderboard.js";

function App() {
  const [allUpdated, setAllUpdated] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [options, setOptions] = useState([]);
  const [userId, setUserId] = useState(0);
  const [logged, setLogged] = useState(false);
  const [quiz, setQuiz] = useState([{}]);
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [typeOfQuestion, setTypeOfquestion] = useState("");
  const [number, setNumber] = useState("");
  const [category, setCategory] = useState("");
  const [score, setScore] = useState(0);

  // Smooth scrolling function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleLogout = () => {
    // Clear token and user data from state
    setToken("");
    setUser("");
    setUserId(0);
    setLogged(false);
    // Redirect to home page or any other desired page after logout
    window.location.href = "/";
  };

  return (
    <Router>
      <div className="App">
        <header>
          <div className="container">
              <h1 className="logo">QuizVizz</h1>
              <nav>
                  <ul className="menu">
                      <li><Link to="#" onClick={() => scrollToSection("home1")}></Link></li>
                      <li><Link to="#" onClick={() => scrollToSection("home")}>Home</Link></li>
                      <li><Link to="#" onClick={() => scrollToSection("dashboard")}>Dashboard</Link></li>
                      <li><Link to="#" onClick={() => scrollToSection("history")}>History</Link></li>
                      <li><Link to="#" onClick={() => scrollToSection("leaderboard")}>Leaderboard</Link></li>
                      <li><Link to="#" onClick={() => scrollToSection("profile")}>Profile</Link></li>
                      {/* {logged ? (
                        <li><Link to="#login" onClick={handleLogout}>Log Out</Link></li>
                      ) : (
                        <>
                          <li><Link to="/login">Login</Link></li>
                          <li><Link to="/register">Register</Link></li>
                        </>
                      )} */}
                  </ul>
              </nav>
          </div>
        </header>


        <section className="hero" id="home1">
          <div className="container">
            <h2>Welcome to Square</h2>
            <p>Your one-stop destination for all your needs.</p>
            <a href="#" className="btn">Get Started</a>
          </div>
        </section>

        <section className="hero" id="home">
          <div className="container">
          <Home></Home>
          </div>
        </section>

        <section className="features" id="dashboard">
          <div className="container">

            <Dashboard></Dashboard>

          </div>
        </section>

        <section className="features" id="history">
          <div className="container">
            {/* <h2>History</h2> */}
            <History></History>
            {/* <section class="ftco-section ftco-services ftco-no-pt">
<div class="container">
<div class="row services-section">
<div class="col-md-4 d-flex align-self-stretch ftco-animate fadeInUp ftco-animated">
<div class="media block-6 services text-center d-block">
<div class="icon"><span class="flaticon-layers"></span></div>
<div class="media-body">
<h3 class="heading mb-3">Perfectly Design</h3>
<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
<p><a href="#" class="btn btn-primary">Read more</a></p>
</div>
</div>
</div>
<div class="col-md-4 d-flex align-self-stretch ftco-animate fadeInUp ftco-animated">
<div class="media block-6 services text-center d-block">
<div class="icon"><span class="flaticon-compass-symbol"></span></div>
<div class="media-body">
<h3 class="heading mb-3">Carefully Planned</h3>
<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
<p><a href="#" class="btn btn-primary">Read more</a></p>
</div>
</div>
</div>
<div class="col-md-4 d-flex align-self-stretch ftco-animate fadeInUp ftco-animated">
<div class="media block-6 services text-center d-block">
<div class="icon"><span class="flaticon-layers"></span></div>
<div class="media-body">
<h3 class="heading mb-3">Smartly Execute</h3>
<p>A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
<p><a href="#" class="btn btn-primary">Read more</a></p>
</div>
</div>
</div>
</div>
</div>
</section> */}
          </div>
        </section>

        <section className="features" id="leaderboard">
          <div className="container">
            {/* <h2>Leaderboard</h2> */}
            <Leaderboard></Leaderboard>
           
          </div>
        </section>

        <section className="features" id="profile">
          <div className="container">
            {/* <h2>Leaderboard</h2> */}
            <Profile></Profile>
           
          </div>
        </section>

        <footer>
          <div className="container">
            <p>&copy; 2024 Square. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router> 
  );
}

export default App;