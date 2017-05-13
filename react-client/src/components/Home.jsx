import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
    	<h2>
    		Welcome back {this.props.firstName}!
  		</h2>

    	);
  }
}

export default Home;