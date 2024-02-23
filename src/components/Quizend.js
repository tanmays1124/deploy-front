import { useNavigate } from 'react-router-dom';  
import './Quizend.css'
import { useEffect } from 'react';
import Cookie from 'js-cookie' 


const Quizend = (props) => {
    const navigate = useNavigate()

  useEffect(()=>{
    if (!Cookie.get("jwt")) {
      navigate("/login");
    }
    props.setQuestions([])
    props.setAnswers([])
    props.setOptions([])
  },[])


    const handleClick =() =>{
      props.setScore(0)
        navigate('/history')
    }
  return (
    <>
      <div className="score-container">
        <div className="score-card">
          <div className="score">Score: {props.score}</div>
          <button className="go-home" onClick={handleClick}>View Results</button>
        </div>
      </div>
    </>
  );
};

export default Quizend;