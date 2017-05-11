import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
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
    this.sendCredentials = this.sendCredentials.bind(this);
    this.revokeCredentials = this.revokeCredentials.bind(this);
  }

  sendCredentials(username, password) {
    this.setState({
      username: username,
      password: password
    });
    axios.post('/login', {username: username, password: password})
    .then(response => {
      console.log('response invoking sendCredentials received from server', response.data);
      this.setState({
        loggedIn: response.data.isLoggedIn,
        userType: response.data.userRole
      });
      window.localStorage.accessToken = response.data.jwtToken;
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
    event.preventDefault();
  }

  revokeCredentials() {
    this.setState({
      username: '',
      password: '',
      loggedIn: false,
      userType: ''
    });

    window.localStorage.accessToken = '';
  }

  componentDidMount() {
    // if(window.localStorage.accessToken) {
    //   this.setState({loggedIn: true});
    // }
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('checkOnClientLoad', config)
    .then(response => {
      console.log('response received from server', response);
      this.setState({
        loggedIn: true,
        userType: response.data.userRole
      });
      console.log(response);
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
  }

  render () {
    console.log('this.state.loggedIn', this.state);
    return (
        <div>
          <Nav/>
          <Route name="login" path="/login" component={() => (<Login enterCredentials={this.sendCredentials}/> )}/>
          <Route name="admin" path="/admin" component={() => (<CreateUser isLoggedIn={this.state.loggedIn}/> )} />
          <Route name="nav" path="/nav" component={Nav} />
          <Route name="documents" path="/documents" component={() => (<DocumentsList isLoggedIn={this.state.loggedIn} userType={this.state.userType} /> )} />
          
          <Route name="video" path="/video" component={() => (<Video isLoggedIn={this.state.loggedIn}/> )} />
          <Route name="logout" path="/logout" component={() => (<Logout revokeCredentials={this.revokeCredentials}/> )} />
        </div>
    )
  }
}

// const Authenticated = (component, loggedIn) => {
//   console.log(component.isLoggedIn)
//   if (component.isLoggedIn) {
//     var RequestedPath = component.name;
//     return (<RequestedPath />);
//   } else {
//     return (<Redirect to="login"/>);
//   }
// }

export default App;