import React from 'react';
import ReactDOM from 'react-dom/client';
import RouterSwitch from './RouterSwitch';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/index.css';
import './styles/welcomeV2.css'
import "./styles/post.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterSwitch />
  </React.StrictMode>
);


