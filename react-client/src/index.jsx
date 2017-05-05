import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" component={App}/>
    </div>
  </BrowserRouter>
), document.getElementById('app'));