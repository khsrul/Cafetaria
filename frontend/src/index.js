import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './components/css/pub.css'
import { RecoilRoot } from 'recoil'

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
        <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
