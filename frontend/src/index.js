import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import App from './App';

const container = document.getElementById('app');
const root = ReactDOM.createRoot(container);
root.render(<App />);