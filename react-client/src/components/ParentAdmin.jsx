import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';


class ParentAdmin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
	    phone: '',
      password: '',
      students: [],
      studentId: null,
      role: 'parent'
		};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleStudentSelect = this.handleStudentSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount() {
    console.log(this.props);
    // Make http request to obtain array of students to populate the dropdown for student.
    axios.get('/admin/students')
    .then(response => {
      console.log('Success getting students list from db.', response.data);
      this.setState ({
        students: response.data
      });
    })
    .catch(error => {
      console.error('Error getting students list from db.', error);
    });
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

  handleStudentSelect(event) {
    this.setState({studentId: event.target.value});
    event.preventDefault();
  }

  handleSubmit() {
    // HTTP transaction to server to send this.state to server.
    let userInfo = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      studentId: this.state.studentId,
      role: this.state.role
    };
    console.log('sending userInfo', userInfo);
    axios.post('/admin/parent', userInfo)
    .then(response => {
      console.log('Successfully added parent to db.', response);
    })
    .catch(error => {
      console.error('Failed to add parent to db.', error);
    });
  }


	render() {
    console.log('this.state.students', this.state.students);
    console.log('Current studentId', this.state.studentId);
  	return (
			<div>
        <h2>Enter Parent Information</h2>
				<form className="form-group">
          <label>First Name:  </label>
          <input type="text" value={this.state.firstName} onChange={this.handleFirstNameChange} />
          <br></br>
          <label>Last Name:  </label>
          <input type="text" value={this.state.lastName} onChange={this.handleLastNameChange} />
          <br></br>
          <label>Email:  </label>
          <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
          <br></br>
          <label>Phone:  </label>
            <input type="text" value={this.state.phone} onChange={this.handlePhoneChange} />
          <br></br>
          <label>Password:  </label>
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          <br></br>
          <label>Student:  </label>
          <select onChange={this.handleStudentSelect} value={this.state.value} >
            <option value="" defaultValue> Please Choose </option>
            {this.state.students.map((student, index) =>
              <option value={student.id} key={index} > {student.first_name + ' ' + student.last_name} </option>
            )}
          </select>
          <br></br>
          <button type="button" onClick={this.handleSubmit}> Submit </button>
				</form>
			</div>
		)
	}

}

export default ParentAdmin;