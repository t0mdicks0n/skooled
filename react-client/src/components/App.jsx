import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './Login.jsx';
import Admin from './Admin.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // items: [],
      username: '',
      password: ''
    }
    this.sendCredentials = this.sendCredentials.bind(this);
  }

  sendCredentials(username, password) {
    this.setState({
      username: username,
      password: password
    });
    axios.post('/login', this.state)
    .then(response => {
      console.log('response recieved from server');
    })
    .catch(error => {
      console.log('error, recieved no response from server');
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
    return (
        <div>
  	      <li><Link to="login">Login</Link></li>
  	      <li><Link to="admin">Admin</Link></li>
        </div>
    )
  }
}

export default App;
   