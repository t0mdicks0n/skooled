import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import CreateUser from './CreateUser.jsx';
import Nav from './Nav.jsx';
import axios from 'axios';


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
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
    event.preventDefault();
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items', 
    //   success: (data) => {
    //     this.setState({
    //       items: data
    //     })
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   }
    // });
  }

  render () {
    console.log('this.state.loggedIn', this.state.loggedIn);
    return (
        <div>
          <Nav/>
          <Route name="login" path="/login" component={() => (<Login enterCredentials={this.sendCredentials}/> )}/>
          <Route name="admin" path="/admin" component={() => (<CreateUser isLoggedIn={this.state.loggedIn}/> )} />
          <Route name="nav" path="/nav" component={Nav} />
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