import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from '/Users/tannerkaysmith/devmtn/WPR32/personal-project-2/src/store.js';
import {Provider} from 'react-redux';



ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>
, document.getElementById('root'));