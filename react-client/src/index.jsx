import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login.jsx';
import Admin from './components/Admin.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: []
    }
  }

  componentDidMount() {
    $.ajax({
      url: '/items', 
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
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

ReactDOM.render((
  <BrowserRouter>
    <div>
      <Route path="/" component={App}/>
      <Route name="login" path="/login" component={Login}/>
      <Route name="admin" path="/admin" component={Admin}/>
    </div>
  </BrowserRouter>
), document.getElementById('app'));