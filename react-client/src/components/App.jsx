import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import CreateUser from './CreateUser.jsx';
import Nav from './Nav.jsx';
import axios from 'axios';
import DocumentsList from './DocumentsList.jsx';
import CreateDocument from './CreateDocument.jsx';
import Video from './Video.jsx';
import Logout from './Logout.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      userType: ''
    }
  }

  render () {
    if (!this.props.isLoggedIn) {
      return (<Redirect to="login"/>);
    } else {
      return (
        <div>
          <Nav/>
          <div className="main container-fluid col-md-9">
            <Route name="nav" path="/nav" component={Nav} />
            <Route name="admin" path="/admin" component={() => (<CreateUser isLoggedIn={this.state.loggedIn}/> )} />
            <Route name="documents" path="/documents" component={() => (<DocumentsList isLoggedIn={this.state.loggedIn} userType={this.props.userType} /> )} />
            <Route name="createDocument" path="/createDocument" component={() => (<CreateDocument userType={this.props.userType} reRender={this.reRender}/>)} />
            <Route name="video" path="/video" component={() => (<Video isLoggedIn={this.state.loggedIn}/> )} />
            <Route name="logout" path="/logout" component={() => (<Logout revokeCredentials={this.props.revokeCredentials}/> )} />
          </div>
        </div>
      )
    }
  }
}

export default App;