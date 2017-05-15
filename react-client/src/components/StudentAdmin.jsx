import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


class StudentAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
      role: 'student'
		};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleSubmit() {
    var currentToken = window.localStorage.accessToken;

    var config = {
      headers: {'Authorization': currentToken}
    };

    let userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role
    };

    axios.post('/admin/student', userInfo, config)
    .then(response => {
      console.log('Successfully added student to db.', response);
    })
    .catch(error => {
      console.error('Failed to add student to db.', error);
    });
  }

	render() {
  	return (
			<div>
        <h2>Enter Student Information</h2>
        <br></br>
        <TextField
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleFirstNameChange}
          id="firsname"
        />
        <br></br>
        <TextField
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.handleLastNameChange}
          id="lastname"
        />
        <br></br>
        <RaisedButton 
          label="Submit" 
          primary={true} 
          style={style} 
          onClick={this.handleSubmit} />
			</div>
		)
	}
}

const style = {
  margin: 12,
};

export default StudentAdmin;