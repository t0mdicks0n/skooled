import React from 'react';
import axios from 'axios';

class Admin extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
	    phone: '',
      password: '',
			role: ''
		};
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  componentDidMount() {
    console.log(this.props)
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
    this.setState({role: event.target.value});
  }

  handleRoleChange(event) {
    this.setState({role: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
  }


	render() {
  	return (
			<div>
				<form> 
          <select>
            <option value={this.state.role} onChange={this.handleSubmit}> Teacher </option>
            <option value={this.state.role} onChange={this.handleSubmit}> Parent </option>  
          </select>
          <br></br>
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
            <input type="text" value={this.state.phone} onChange={this.handlePasswordChange} />
          </label>
          <br></br>
          <select> 
            <option value={this.state.role} onChange={this.handleSubmit}>  </option> */GET student ID's and names from DB
          </select>
          <br></br>
          <button type="button" onSubmit={this.handleSubmit}> Submit </button>
				</form>
			</div>
		)
	}

}

export default Admin;