import React from 'react';
// import ListItem from './ListItem.jsx';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

const Nav = (props) => (
  <div>
	<li><Link to="login">Login</Link></li>
	<li><Link to="admin">Admin</Link></li>
  	<li><Link to="documents">Documents</Link></li>
  	<li><Link to="video">Video</Link></li>
  </div>
)

export default Nav;