import React from 'react';
import Admin from './Admin.jsx';
import { Route, Link, Redirect } from 'react-router-dom';

class EnsureLoggedIn extends React.Component {
	constructor (props) {
		super(props);
    this.state = {
      userID: '',
      isLoggedIn: false
	  };
	}

	render() {
    return (
    	this.state.isLoggedIn ? (
	    	<div>
	        <Route name="admin" path="/admin" component={Admin}/>
	    	</div>
    		) : (
    			<Redirect to="/login"/>
    		)
    );
  }
}

export default EnsureLoggedIn;