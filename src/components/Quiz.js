import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import ip from "../ipaddr.js";

const Quiz = (props) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [currQuestion, setCurrQuestion] = useState(props.questions[0]);
  const [currAnswer, setCurrAnswer] = useState(props.answers[0]);
  const [currOptions, setCurrOptions] = useState(props.options[0]);

  const [attempted, setAttempted] = useState([]);
  const [isCorrect, setIsCorrect] = useState([]);
  const [isSelected, setIsSelected] = useState(false);

  const [timer, setTimer] = useState(15);

  const navigate = useNavigate();

  const [val, setVal] = useState("");
  var allUpdated = false;
  const handleSelect = (event) => {
    setVal(event.target.textContent);
    const option = event.target;
    const selectedOptions = document.getElementsByClassName("option");
    for (const selectedOption of selectedOptions) {
      selectedOption.style.background = "#aedaed";
      selectedOption.style.color = "black";
    }
    option.style.background = "#023252";
    option.style.color = "white";
    console.log(val);

    // if (val === currOptions[currAnswer]) {
    //   console.log("correct");
    //   console.log(currQuestion);
    //   setAttempted((prevAttempted) => [...prevAttempted, currQuestion]);
    //   setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
    //   props.setScore(props.score + 1);
    //   console.log(props.score);
    // } else {
    //   console.log("Incorrect");
    //   console.log(currQuestion);
    //   setAttempted((prevAttempted) => [...prevAttempted, currQuestion]);
    //   setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
    // }
  };

  const handleNext = () => {
    if (val === currOptions[currAnswer]) {
      console.log("correct");
      console.log(currQuestion);
      setAttempted((prevAttempted) => [...prevAttempted, currQuestion]);
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
      props.setScore(props.score + 1);
      console.log(props.score);
    } else {
      console.log("Incorrect");
      console.log(currQuestion);
      setAttempted((prevAttempted) => [...prevAttempted, currQuestion]);
      setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
    }
    setVal("");

    const options = document.getElementsByClassName("option");
    for (const option of options) {
      option.style.backgroundColor = "#aedaed";
      option.style.color = "black";
    }

    if (currIndex < props.questions.length - 1) {
      setCurrIndex((prevIndex) => prevIndex + 1);
      setCurrAnswer(props.answers[currIndex + 1]);
      setCurrQuestion(props.questions[currIndex + 1]);
      setCurrOptions(props.options[currIndex + 1]);

      // Update Quiz History for the current question
      // updateHistory(currQuestion, currOptions, currOptions[currAnswer]);
      setTimer(15);
    }
    if (
      attempted.length === props.questions.length &&
      isCorrect.length === props.questions.length
    ) {
      console.log(attempted);

      // Ensure state is updated before navigating

      const userid = localStorage.getItem("userId");

      const postData = async () => {
        const url = `http://${ip}:8000/api/questionhistorycreate/`;

        const newQuestionHistory = {
          user: userid,
          domain: props.category,
          difficulty_level: props.difficultyLevel,
          score: props.score,
          attempted_questions: attempted.map((q_text, index) => ({
            q_text,
            is_correct: isCorrect[index],
          })),
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newQuestionHistory),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          console.log("New Question History created:", responseData);
        } catch (error) {
          console.error("Error posting data:", error);
        }
      };

      // Call the postData function
      postData();

      navigate("/quizend");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (
      attempted.length === props.questions.length &&
      isCorrect.length === props.questions.length
    ) {
      allUpdated = true;
    }
  }, [attempted, isCorrect]);

  useEffect(() => {}, [allUpdated]);

  const updateHistory = (question, options, userAnswer) => {
    const isQuestionAlreadyAttempted = attempted.includes(question);

    if (!isQuestionAlreadyAttempted) {
      // console.log("Updating Quiz History:", question, options, userAnswer);
      setAttempted((prevAttempted) => [...prevAttempted, question]);

      if (userAnswer === options[props.answers[currIndex]]) {
        setIsCorrect((prevIsCorrect) => [...prevIsCorrect, true]);
        props.setScore(props.score + 1);
      } else {
        setIsCorrect((prevIsCorrect) => [...prevIsCorrect, false]);
      }
    } else {
      console.log("Question already attempted:", question);
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(timerInterval); // Stop the timer
          handleNext(); // Move to the next question
        }
        return prevTimer - 1;
      });
    }, 1000); // Timer updates every second

    return () => clearInterval(timerInterval);
  }, [currIndex]);

  return (
    <div className="quiz-container">
      <center>
        <h1>Quiz</h1>
      </center>
      <div className="timer">
        <AccessAlarmsIcon />
        :&nbsp;<strong>{timer}</strong>
      </div>
      <div className="question-container">
        <p className="question">{currQuestion}</p>
        <div className="centered-container">
          <div className="options-container">
            <div className="option-pair">
              <div className="option" data-answer="1" onClick={handleSelect}>
                {currOptions[0]}
              </div>
              <div className="option" data-answer="2" onClick={handleSelect}>
                {currOptions[1]}
              </div>
            </div>
            <div className="option-pair">
              <div className="option" data-answer="3" onClick={handleSelect}>
                {currOptions[2]}
              </div>
              <div className="option" data-answer="4" onClick={handleSelect}>
                {currOptions[3]}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <button className="next-button" >
        Next
      </button> */}
      <button
        type="button"
        onClick={handleNext}
        class="next btn btn-outline-info"
      >
        Next
      </button>
    </div>
  );
};
export default Quiz;
