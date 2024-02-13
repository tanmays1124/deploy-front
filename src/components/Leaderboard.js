import Layout from './Layout';
import Board from './lead/board';
import './lead/style.css';

function App({open, token}) {
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