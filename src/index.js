// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App';

// ReactDOM.render(<App />, document.getElementById('root'));

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Import your main App component or root component

// Use createRoot instead of ReactDOM.render
const root = document.getElementById("root");
const rootInstance = ReactDOM.createRoot(root);
rootInstance.render(<App />);