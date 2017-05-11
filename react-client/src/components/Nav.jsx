import React from 'react';
// import ListItem from './ListItem.jsx';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

const Nav = (props) => (
  <div>
    <ul className="nav nav-pills nav-stacked col-md-3">
    	<li role="presentation"><Link to="login">Login</Link></li>
    	<li role="presentation"><Link to="admin">Settings</Link></li>
     	<li role="presentation"><Link to="logout">Logout</Link></li>
      <li role="presentation"><Link to="documents">Documents</Link></li>
      <li role="presentation"><Link to="video">Video</Link></li>
    </ul>
  </div>
)

export default Nav;