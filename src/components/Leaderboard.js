import { useEffect } from 'react';
import Layout from './Layout';
import Navbar from './Navbar'
import Board from './lead/board';
import './lead/style.css';
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';

function App({open, token}) {

const navigate = useNavigate()

useEffect(()=>
  {
    if (!Cookie.get("jwt")) {
    navigate("/login");
  }
})
  return (
    <>
    <Navbar/>
    <div className="App" id='main'>
        <Board token={token}/>
    </div>
    
    </>
  );
}

export default App;