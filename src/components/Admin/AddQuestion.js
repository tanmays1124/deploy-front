// Admin.js
import React, { useState } from 'react';
import './AddQuestion.css'; // Add your styling
import Navbar from './AdminNav';
import axios from 'axios';
const Adminpage = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [correctOption, setCorrectOption] = useState('A');
  const [domain, setDomain] = useState('HTML');
  const [disable, setDisable] = useState(true)
  var correct;

  const emptyfun = (arr) =>{
    for(let i=0;i<arr.length;i++)
    {
      if(arr[i]==='')
        return true 
    }
    return false
  }


  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    if (options.length < 4) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = () => {
    if (options.length > 2) {
      setOptions(options.slice(0, options.length - 1));
    }
  };

  const handleUploadQuestion = async () => {
    // Add logic to upload question and answers
    
    if(options.length<4)
    {
      options.push(null)
    }
    if(options.length<4)
    {
      options.push(null)
    }


    if(correctOption=== "A")
      correct = 0
      if(correctOption=== "B")
      correct = 1
      if(correctOption=== "C")
      correct = 2
      if(correctOption=== "D")
      correct = 3

    console.log(options)


      try {
        const response = await axios.post('http://127.0.0.1:8000/api/quiz-questions/create/',
          {
            'category': domain,
            'difficulty': 'easy',
            'question': question,
            'option_a': options[0],
            'option_b': options[1],
            // 'option_c': options[2],
            // 'option_d': options[3],
            'answer': correct,
          })
    
    
        if (response.status!==201) {
          throw new Error('Network response was not ok');
        }
    
        // const responseData = await response.json();
        // console.log('Question created successfully:', responseData);
        console.log('Question Uploaded:', {
          question,
          options,
          correct,
          domain,
        });
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }








  
  };

  return (
    <>
    <Navbar tab='User Details'/>
    <div className="admin-container">
      <h2>Add Question </h2>
      <div className="admin-form">
        <label>
          Question:
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>

        <label>
          Options:
          {options.map((option, index) => (
            <div key={index}>
              <label>{`Option ${String.fromCharCode(65 + index)}:`}</label>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </div>
          ))}
          <div className='option-buttons'>
          {options.length < 4 && <button onClick={handleAddOption}>+</button>}
          {options.length > 2 && <button onClick={handleRemoveOption}>-</button>}
          </div>
        </label>

        <label>
          Correct Option:
          <select
            value={correctOption}
            onChange={(e) => setCorrectOption(e.target.value)}
          >
            {options.map((option, index) => (
              <option key={index} value={String.fromCharCode(65 + index)}>
                {`${String.fromCharCode(65 + index)}`}
              </option>
            ))}
          </select>
        </label>

        <label>
          Domain:
          <select
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="custom-select"
          >
            <option value="Linux">Linux</option>
            <option value="MongoDB">MongoDB</option>
            <option value="AI/ML">AI/ML</option>
            <option value="HTML">HTML</option>
          </select>
        </label>

        <button onClick={handleUploadQuestion} id='upload-btn' >Upload Question</button>
      </div>
    </div>
    </>
  );
};

export default Adminpage;
