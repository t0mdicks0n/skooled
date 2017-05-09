import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


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

  // componentDidMount() {
  //   console.log(this.props)
  // }

  handleFirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }

  handleLastNameChange(event) {
    this.setState({lastName: event.target.value});
  }

  handleSubmit() {
    let userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      role: this.state.role
    };
    axios.post('/admin/student', userInfo)
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
          <button type="button" onClick={this.handleSubmit}> Submit </button>
				</form>
			</div>
		)
	}

}

export default StudentAdmin;