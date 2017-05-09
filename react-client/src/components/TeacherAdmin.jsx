import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


class TeacherAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
	    phone: '',
      password: '',
      role: 'teacher'
		};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount() {
    console.log(this.props);
    console.log('Rendering TeacherAdmin component');
  }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePhoneChange(event) {
    this.setState({phone: event.target.value});
  }
  
  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit() {
    // HTTP transaction to server to send this.state to server.
    let userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      role: this.state.role
    };
    console.log('sending userInfo', userInfo);
    axios.post('/admin/teacher', userInfo)
    .then(response => {
      console.log('Successfully added teacher to db.', response);
    })
    .catch(error => {
      console.error('Failed to add teacher to db.', error);
    });
  }


	render() {
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
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          </label>
          <br></br>
          <label>
            Phone:
            <input type="text" value={this.state.phone} onChange={this.handlePhoneChange} />
          </label>
          <br></br>
          <label>
            Password:
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <br></br>
          <button type="button" onClick={this.handleSubmit}> Submit </button>
				</form>
			</div>
		)
	}
}

export default TeacherAdmin;