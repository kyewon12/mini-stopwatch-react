import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

//    <React.StrictMode> : 잘못된 렌더링을 확인하려고, 렌더링이 2번씩 찍힘
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);
