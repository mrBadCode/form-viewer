import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import testData from './testData';

ReactDOM.render(<App inputData={testData} />, document.getElementById('root'));
registerServiceWorker();
