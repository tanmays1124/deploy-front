// import react from 'react';
import "./Home.css";
import linux from "../images/linux.jpg";
import sql from "../images/sql.jpg";
import ml from "../images/ml.jpg";
import pyimg from "../images/python.png";
import docker from "../images/docker.png";
import mongodb from "../images/mongodb.jpg";
import html from "../images/html.jpg";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Loading from "./Loading";
import axios from "axios";
import Layout from "./Layout";
import ip from "../ipaddr.js";
import Cookie from "js-cookie";






const Modal = (props) => {
  // const [allUpdated, setAllUpdated] = useState(false);
  const navigate = useNavigate();
  const [selectedValues, setSelectedValues] = useState({
    select1: "",
    select2: "",
    select3: "",
  });
  let difficulty = "";
  let type_of_question = "";
  let num_questions = 0;

  const handleDropdownChange = (selectName, event) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [selectName]: event.target.value,
    }));
  };

  // const handleStart = () => {
  //   console.log("Selected value:", selectedValues.select1);
  //   console.log("Selected value:", selectedValues.select2);
  //   console.log("Selected value:", selectedValues.select3);
  //   console.log("Selected value:", props.category);
  // };

  const handleStart = async (event) => {
    event.preventDefault();
    props.setLoading(true)
    console.log("Selected value:", selectedValues.select1);
    console.log("Selected value:", selectedValues.select2);
    console.log("Selected value:", selectedValues.select3);
    console.log("Selected value:", props.category);

    if (selectedValues.select1 == "1") {
      difficulty = "easy";
    } else if (selectedValues.select1 == 2) {
      difficulty = "medium";
    } else {
      difficulty = "difficult";
    }

    if (selectedValues.select2 == 1) {
      type_of_question = "One Word";
    } else {
      type_of_question = "MCQ";
    }

    if (selectedValues.select3 == 1) {
      num_questions = 10;
    } else if (selectedValues.select3 == 2) {
      num_questions = 15;
    } else {
      num_questions = 20;
    }

    props.setDifficultyLevel(difficulty);
    props.setTypeOfquestion(type_of_question);
    props.setNumber(num_questions);
    console.log(props.token)
    try {
      const user_id = localStorage.getItem("userId");

      const response = await axios.get(`http://${ip}:8000/api/questions/`, {
  params: {
    category: props.category,
    difficulty: difficulty,
    num_questions: num_questions,
  },
  headers: {
    'Authorization': `Bearer ${props.token}`,
    'Content-type': 'application/json'
  }
});


      let que = [];
      let ans = [];
      let opt = [];
      function myFunction(item) {
        let op = [];
        op.push(item.option_a);
        op.push(item.option_b);
        op.push(item.option_c);
        op.push(item.option_d);

        que.push(item.question);
        ans.push(item.answer);

        opt.push(op);
      }
      response.data.forEach(myFunction);
      props.setAnswers(ans);
      props.setQuestions(que);
      props.setOptions(opt);
      console.log(
        "All three states are updated:",
        props.questions,
        props.options,
        props.answers
      );
    } catch (err) {
      console.error("Error" + err);
    }
  };

  useEffect(() => {
    if (
      props.questions &&
      props.questions.length > 0 &&
      props.options &&
      props.options.length > 0 &&
      props.answers &&
      props.answers.length > 0
    ) {
      props.setAllUpdated(true);
      props.setLoading(false)
      navigate("/quiz");

      console.log(props.questions, props.options, props.answers);
    }
  }, [props.questions, props.options, props.answers]);



  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                {props.category}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body container">
              <div className="row">
                <div className="col-12" style={{ marginBottom: "20px" }}>
                  <select
                    className="form-select "
                    aria-label="Default select example"
                    onChange={(e) => handleDropdownChange("select1", e)}
                    value={selectedValues.select1}
                  >
                    <option defaultValue>Select Difficulty Level</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </select>
                </div>
              </div>


              <div className="row">
                <div className="col-12" style={{ marginBottom: "20px" }}>
                  <select
                    className="form-select col"
                    aria-label="Default select example"
                    onChange={(e) => handleDropdownChange("select3", e)}
                    value={selectedValues.select3}
                  >
                    <option defaultValue>select Number of Questions</option>
                    <option value="1">10</option>
                    <option value="2">15</option>
                    <option value="3">20</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={handleStart}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Cards = (props) => {
  const handleModal = (title) => {
    props.setCategory(title);
  };

  return (
    <>
      {/* {loading ? (
        <Loading />
      ) : ( */}
      <div
        className="col-lg-3 col-md-4 col-sm-6"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        onClick={() => handleModal(props.title)}
      >
        <div className="card rounded bg-secondary domain-card">
          <img src={props.image} className="card-img-top" alt="title" />
          <div className="card-body">
            <h5 className="card-title">
              <p>{props.title}</p>
            </h5>
            <p className="card-text">{props.content}</p>
          </div>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

const Home = ({
  user,
  setUser,
  token,
  setToken,
  setLogged,
  questions,
  setQuestions,
  options,
  setOptions,
  answers,
  setAnswers,
  userId,
  setUserId,
  difficultyLevel,
  setDifficultyLevel,
  typeOfQuestion,
  setTypeOfquestion,
  number,
  setNumber,
  category,
  setCategory,
  allUpdated,
  setAllUpdated,
}) => {
  console.log(userId);
  console.log(typeof localStorage.getItem("userId"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!Cookie.get("jwt")) {
      navigate("/login");
    }
    
  },[]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* <Navbar
        user={user}
        setUser={user}
        token={token}
        setToken={setToken}
        setLogged={setLogged}
        page={"Home"}
      /> */}

      <Layout>
        {loading ? (<Loading/>) : (
        <div className="background">
          <div className="container" style={{ overflowX: "hidden" }}>
            <div className="row">
              <Cards
                title={"Linux"}
                image={linux}
                content={
                  "Click to begin attempt on Linux and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
              <Cards
                title={"MongoDB"}
                image={mongodb}
                content={
                  "Click to begin attempt on Mongo and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
              <Cards
                title={"AIML"}
                image={ml}
                content={
                  "Click to begin attempt on AI/ML and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
              <Cards
                title={"HTML"}
                image={html}
                content={
                  "Click to begin attempt on HTML and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
              <Cards
                title={"Python"}
                image={pyimg}
                content={
                  "Click to begin attempt on Python and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
              <Cards
                title={"SQL"}
                image={sql}
                content={
                  "Click to begin attempt on SQL and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
              <Cards
                title={"Docker"}
                image={docker}
                content={
                  "Click to begin attempt on Docker and it's sub-domain topics."
                }
                questions={questions}
                setQuestions={setQuestions}
                answers={answers}
                setAnswers={setAnswers}
                options={options}
                setOptions={setOptions}
                category={category}
                setCategory={setCategory}
                user={user}
                setUser={setUser}
              />
            </div>
          </div>
        </div>)}
        <Modal
          questions={questions}
          setQuestions={setQuestions}
          answers={answers}
          setAnswers={setAnswers}
          options={options}
          setOptions={setOptions}
          category={category}
          setCategory={setCategory}
          difficultyLevel={difficultyLevel}
          setDifficultyLevel={setDifficultyLevel}
          typeOfQuestion={typeOfQuestion}
          setTypeOfquestion={setTypeOfquestion}
          number={number}
          setNumber={setNumber}
          userId={userId}
          setUserId={setUserId}
          allUpdated={allUpdated}
          setAllUpdated={setAllUpdated}
          token = {token}
          setToken = {setToken}
          loading = {loading}
          setLoading = {setLoading}
        />
      </Layout>
    </>
  );
};

export default Home;