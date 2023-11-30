import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/fontawesome/fontawesome-5.15.4.css';
import './assets/css/website/style.scss';
import Header from './components/Header';
import './index.css';
import reportWebVitals from './reportWebVitals';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
  </React.StrictMode>
);

reportWebVitals();
