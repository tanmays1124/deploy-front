import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BarGraph from './pages/BarGraph';
import LineGraph from './pages/LineGraph';
import "./pages/Dash.css";
import Navbar from "./Navbar";
import Layout from './Layout';
import ip from '../ipaddr.js'
import Cookie from 'js-cookie'
import Loading from './Loading'
import MenuAppBar from './AppBar.js';

function Dashboard({ open, token, setToken }) {
  const [quizData, setQuizData] = useState([]);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalIncorrectQuestions, setTotalIncorrectQuestions] = useState(0);
  const [totalCorrectQuestions, setTotalCorrectQuestions] = useState(0);
  const jwt = sessionStorage.getItem('jwt')


  useEffect(() => {

    if (!Cookie.get("jwt")) {
      navigate("/login");
    }
    const fetchQuizData = async () => {
      try {
        const userId = localStorage.getItem('userId')

        const response = await fetch(
          `http://${ip}:8000/api/quiz-history/`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${jwt}`,
  
              'Content-Type': 'application/json'
            }
          }
        );
        const fetchedData = await response.json();
  
        if (fetchedData) {
          setQuizData(fetchedData);
        } else {
          console.error('Fetched data is undefined.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchQuizData();
  }, []);
  


  useEffect(() => {
    console.log('Quiz Data:', quizData);
    
  setTotalQuizzes(quizData.length);
  // print(totalQuizzes)
  const incorrectQuestions = quizData.reduce((total, item) => {
    try {
      const attemptedQuestions = item.attempted_questions 

  
      const incorrectCount = Array.isArray(attemptedQuestions)
        ? attemptedQuestions.reduce((acc, question) => acc + (question && question.is_correct === false ? 1 : 0), 0)
        : 0;
  
      return total + incorrectCount;
    } catch (error) {
      console.error('Error in totalIncorrectQuestions:', error);
      return total;
    }
  }, 0);

  setTotalIncorrectQuestions(incorrectQuestions)
  console.log(totalIncorrectQuestions)
  
  
  

  const correctQuestions = quizData.reduce((total, item) => {
    try {
      const attemptedQuestions = item.attempted_questions
        // ? item.attempted_questions
        // .replace(/OrderedDict\(\[\(/g, "{")
        // .replace(/\]\)/g, "}")
        // .replace(/\)/g, "")
        // .replace(/\(/g, "")
        // .replace(/t\'\,/g, "t':")
        // .replace(/'/g, '"')
        // .replace(/True/g, "true")
        // .replace(/False/g, "false")
        // : item.attempted_questions;
  
      // const cleanedQuestions = JSON.parse(attemptedQuestions);
      // print(cleanedQuestions)
  
      const correctCount = Array.isArray(attemptedQuestions)
        ? attemptedQuestions.reduce((acc, question) => acc + (question && question.is_correct === true ? 1 : 0), 0)
        : 0;
      console.log(total+correctCount)
      return total + correctCount;
    } catch (error) {
      console.error('Error in totalCorrectQuestions:', error);
      return total;
    }
  }, 0);

  setTotalCorrectQuestions(correctQuestions)
  console.log(totalCorrectQuestions)

  
  
  
  






  }, [quizData]);
  
  
  useEffect(() => {
    console.log('Total Quizzes:', totalQuizzes);
    console.log('Total Incorrect Questions:', totalIncorrectQuestions);
    console.log('Total Correct Questions:', totalCorrectQuestions);

  }, [totalQuizzes, totalIncorrectQuestions, totalCorrectQuestions]);


  


  return (
    <>
    <Navbar/>

     <div className='bo'>
          <Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: '100%' }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <div className="App" style={{ color: '#000' }}>
                <div className='das'>
                  <h1>
                    Dashboard <i className="fas fa-tachometer-alt"></i>
                  </h1>
                </div>
                <div className="card-container-11" style={{ display: 'flex' }}>
                  <Card className="card-12 primary-card" sx={{ flex: 1, backgroundColor: '#1565C0' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Quizzes
                      </Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        {quizData.length}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className="card-12 danger-card" sx={{ flex: 1, backgroundColor: '#D32F2F' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Incorrect
                      </Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        {totalIncorrectQuestions}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className="card-12 success-card" sx={{ flex: 1, backgroundColor: '#388E3C' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Correct
                      </Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        {totalCorrectQuestions}
                      </Typography>
                    </CardContent>
                  </Card>
                  <Card className="card-12 secondary-primary-card" sx={{ flex: 1, backgroundColor: '#64B5F6' }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        Questions
                      </Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        {totalCorrectQuestions+totalIncorrectQuestions}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
                <div className="card-container-22" style={{ display: 'flex' }}>
                  <div className="card-12">
                    <LineGraph token={token}/>
                  </div>
                  <div className="card-12">
                    <BarGraph token={token}/>
                  </div>
                </div>
              </div>
            </Box>
          </Box>
        </div>
      
    </>
  );
}

export default Dashboard;