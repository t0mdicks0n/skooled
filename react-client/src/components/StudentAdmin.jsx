import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


class StudentAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: ''
		};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  // componentDidMount() {
  //   console.log(this.props)
  // }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }
  
	render() {
    if (!this.props.isLoggedIn) {
      return (<Redirect to="login"/>)
    } else {
    	return (
  			<div>
  				<form>        
            <label>
              First Name:
              <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
            </label>
            <br></br>
            <label>
              Last Name:
              <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
            </label>
            <br></br>
            <button type="button" onSubmit={this.handleSubmit}> Submit </button>
  				</form>
  			</div>
  		)
    }
	}

}

export default StudentAdmin;