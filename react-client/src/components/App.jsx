import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import CreateUser from './CreateUser.jsx';
import Nav from './Nav.jsx';
import axios from 'axios';
import DocumentList from './DocumentList.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      password: '',
      loggedIn: false
    }
    this.sendCredentials = this.sendCredentials.bind(this);
  }

  sendCredentials(username, password) {
    this.setState({
      username: username,
      password: password
    });
    axios.post('/login', {username: username, password: password})
    .then(response => {
      console.log('response received from server', response.data.isLoggedIn);
      this.setState({
        loggedIn: response.data.isLoggedIn
      });
      console.log('Response on successfull post ', response.data);
      window.localStorage.accessToken = response.data.jwtToken;
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
    event.preventDefault();
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
      console.log('response received from server', response.data);
      this.setState({loggedIn: true});
      console.log(response);
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
  }

  render () {
    console.log('this.state.loggedIn', this.state.loggedIn);
    return (
        <div>
          <Nav/>
          <Route name="login" path="/login" component={() => (<Login enterCredentials={this.sendCredentials}/> )}/>
          <Route name="admin" path="/admin" component={() => (<CreateUser isLoggedIn={this.state.loggedIn}/> )} />
          <Route name="nav" path="/nav" component={Nav} />
          <Route name="documents" path="/documents" component={DocumentList} />
          {/*<Route name="video" path="/video" component={Video} />*/}
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