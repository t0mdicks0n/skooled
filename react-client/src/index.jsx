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
    <Route name="login" path="/login" component={Login}/>
    <Route name="admin" path="/admin" component={Admin} />


  </div>
</BrowserRouter>


), document.getElementById('app'));

