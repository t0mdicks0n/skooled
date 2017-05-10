import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
  	this.props.revokeCredentials();
  }
  render () {
  	return (<Redirect to="login" />)
  }
}
export default Logout;