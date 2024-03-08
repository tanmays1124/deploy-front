import React, { useState } from 'react';
import './AdminNav.css'
import { useNavigate } from 'react-router-dom';


const Navbar = ({onSearch, tab}) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const navigate = useNavigate()
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchInput);
    console.log('clicked',searchInput)
  };

  const onAddQuestions = () =>{
    if(tab === 'Add Questions')
    navigate('/addquestion')
    else
    navigate('/admin')
    
  }

  return (
    <nav className="admin-navbar">
      <div className="logo">
        <h1>QuizVizz</h1>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Username"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      
      <div className="user-info">
        <span>Admin</span>
      </div>
      <div className="admin-nav-tabs">
        <button onClick={onAddQuestions}>{tab}</button>
      </div>
    </nav>
  );
};

export default Navbar;
