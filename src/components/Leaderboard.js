import { useEffect } from 'react';
import Layout from './Layout';
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
    <Layout open={open}>
    <div className="App" id='main'>
        <Board token={token}/>
    </div>
    </Layout>
    </>
  );
}

export default App;