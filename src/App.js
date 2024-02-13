// import react from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
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
// import Linegraph from "./components/pages/LineGraph";
// import Bargraph from "./components/pages/BarGraph";
// import Pie from "./components/pages/Pie";
// import bg from "../images/bg33.jpg";

import { useState } from "react";

const App = () => {
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

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />

        <Route path="/register" exact element={<Registration />} />

        <Route
          path="/login"
          exact
          element={
            <Login
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
              setLogged={setLogged}
              userId={userId}
              setUserId={setUserId}
            />
          }
        />

        <Route
          path="/home"
          element={
            <Home
              allUpdated={allUpdated}
              setAllUpdated={setAllUpdated}
              token={token}
              setToken={setToken}
              user={user}
              setUser={setUser}
              setLogged={setLogged}
              questions={questions}
              setQuestions={setQuestions}
              answers={answers}
              setAnswers={setAnswers}
              options={options}
              setOptions={setOptions}
              quiz={quiz}
              setQuiz={setQuiz}
              userId={userId}
              setUserId={setUserId}
              difficultyLevel={difficultyLevel}
              setDifficultyLevel={setDifficultyLevel}
              typeOfQuestion={typeOfQuestion}
              setTypeOfquestion={setTypeOfquestion}
              number={number}
              setNumber={setNumber}
              category={category}
              setCategory={setCategory}
            />
          }
        />

        <Route
          path="/history"
          exact
          element={
            <History
              user={user}
              setUser={setUser}
              userId={userId}
              setUserId={setUserId}
              token = {token}
              setToken = {setToken}
            />
          }
        />

        <Route
          path="/dashboard"
          exact
          element={
            <Dashboard
              user={user}
              setUser={setUser}
              userId={userId}
              setUserId={setUserId}
              token = {token}
              setToken = {setToken}
            />
          }
        />

        {/* <Route path="/bgraph" exact element={<Bargraph />} 
              userId = {userId}
              setUserId = {setUserId}/>
         <Route path="/lgraph" exact element={<Linegraph />} 
              userId = {userId}
              setUserId = {setUserId}/> */}

        <Route
          path="/leaderboard"
          exact
          element={
            <Leaderboard
              user={user}
              setUser={setUser}
              userId={userId}
              setUserId={setUserId}
              token = {token}
            />
          }
        />

        <Route
          path="/quiz"
          exact
          element={
            <Quiz
              allUpdated={allUpdated}
              setAllUpdated={setAllUpdated}
              questions={questions}
              setQuestions={setQuestions}
              answers={answers}
              setAnswers={setAnswers}
              options={options}
              setOptions={setOptions}
              userId={userId}
              setUserId={setUserId}
              quiz={quiz}
              setQuiz={setQuiz}
              difficultyLevel={difficultyLevel}
              setDifficultyLevel={setDifficultyLevel}
              typeOfQuestion={typeOfQuestion}
              setTypeOfquestion={setTypeOfquestion}
              number={number}
              setNumber={setNumber}
              category={category}
              setCategory={setCategory}
              score={score}
              setScore={setScore}
              token = {token}
              setToken = {setToken}
            />
          }
        />
        <Route
          path="/quizend"
          exact
          element={
            <Quizend
              score={score}
              setScore={setScore}
              questions={questions}
              setQuestions={setQuestions}
              answers={answers}
              setAnswers={setAnswers}
              options={options}
              setOptions={setOptions}
            />
          }
        />
        <Route path="/forgot" exact element={<Forgot />} />
        <Route path="/profile" exact element={<Profile token={token}/>} />
      </Routes>
    </Router>
  );
};

export default App;
