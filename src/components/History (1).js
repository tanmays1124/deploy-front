import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./History (1).css";
import bg1 from "../images/history1.png";
import Navbar from "./Navbar";
import Layout from './Layout';
import ip from '../ipaddr.js'
import Cookie from "js-cookie"; 
import AppBar from './Navbar';


const History = ({ userId, setUserId ,open, token, setToken}) => {
  const styles = {
    background: {
      backgroundImage: `url(${bg1})`,
      backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat:"no-repeat",
      height: "50vh", // Adjust the height to make the image smaller
      width: "50vw",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      textAlign: "center",
      fontSize: "24px",
      opacity: "0.7",
    },

    contained: {
      width: "100vw",
      height: "100vh",
      display: "grid",
      placeItems: "center",
      alignItems: "center",
      backgroundColor: "transparent"
    },
    text: {
      fontSize: "larger",
      color: "rgb(194 194 194)",
      marginBottom: "-100px",
    },
  };

  const [questionHistory, setQuestionHistory] = useState([]);
  const navigate = useNavigate();
  const toJSON = (str) => {
    str = str
      .replace(/OrderedDict\(\[\(/g, "{")
      .replace(/\]\)/g, "}")
      .replace(/\)/g, "")
      .replace(/\(/g, "")
      .replace(/t\'\,/g, "t':")
      .replace(/'/g, '"')
      .replace(/True/g, "true")
      .replace(/False/g, "false");

    var jsonArray = JSON.parse(str);

    return jsonArray;
  };



  const fetchUserQuestionHistory = async () => {
    try {
  
      // Make GET request to fetch user question history
      const response = await fetch(
        `http://${ip}:8000/api/quiz-history/`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,

            'Content-Type': 'application/json'
          }
        }
      );
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setQuestionHistory(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  useEffect(() => {
    if (!Cookie.get("jwt")) {
      navigate("/login");
    }
    fetchUserQuestionHistory();

  }, []);

  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(selectedQuiz===quiz ? null:quiz);
  };

  function conversion(timestamp) {
    const currentDate = new Date(timestamp);
    const options = { timeZone: "Asia/Kolkata" };

    const year = currentDate.toLocaleString("en-IN", { year: "numeric" });
    const month = currentDate.toLocaleString("en-IN", { month: "2-digit" });
    const day = currentDate.toLocaleString("en-IN", { day: "2-digit" });

    const hours = currentDate.toLocaleString("en-IN", {
      hour: "2-digit",
      hour12: false,
    });
    const minutes = currentDate.toLocaleString("en-IN", { minute: "2-digit" });
    const seconds = currentDate.toLocaleString("en-IN", { second: "2-digit" });

    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
  }

  return (
    <>
        <Layout open={open}>
        <AppBar />
      {questionHistory.length == 0 ? (<>
        <div className="history-contained" style={styles.contained}>
          <div className="text" style={styles.text}>
            No history
          </div>

          <div className="background" style={styles.background}></div>
          
         </div> </>
      ) : (
        <div className="quiz-history-container">
          <div className="quiz-history">
            <center>
              
              <h2>Quiz History </h2>{" "}
            </center>
            <ul className="quiz-list">
              {questionHistory.map((quiz) => (
                <li
                  key={quiz.id}
                  className={`quiz-card ${
                    selectedQuiz === quiz ? "selected" : ""} ${quiz.difficulty_level.toLowerCase() 
                  }`}
                  onClick={() => handleQuizClick(quiz)}
                >
                 <div className={`quiz-header ${quiz.difficulty_level.toLowerCase()}`}>
  <span style={{ fontFamily: 'initial', fontSize: '16px', fontWeight: 'bold' }}>
    {quiz.domain}
  </span>
</div>
                  <div className="quiz-details"style={{fontFamily:'fantasy'}}>
        
                    <p style={{fontFamily:'serif',fontSize:18}}>Score: {quiz.score}</p>
                    <p style={{fontFamily:'serif',fontSize:18}}>Difficulty: {quiz.difficulty_level}</p>
                    <p style={{fontFamily:'serif',fontSize:18}}>Time: {conversion(quiz.submission_time)}</p>
                  
                  </div>
                  {selectedQuiz === quiz && (
                    <div className="answers">
                      {selectedQuiz.attempted_questions.map(
                        (attempt, index) => (
                          <div
                            key={index}
                            className={`answer ${
                              attempt.is_correct ? " correct" : "wrong"
                            }`}
                          >
                             {/* <span className="symbol">{attempt.is_correct ? '✔' : '✘'}</span> */}
                             <span className="question-text">{attempt.q_text}</span>

                          </div>
                        )
                      )}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      </Layout>
    </>
  );
};

export default History;