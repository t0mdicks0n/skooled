import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
import TeacherAdmin from './TeacherAdmin.jsx';
import ParentAdmin from './ParentAdmin.jsx';
import StudentAdmin from './StudentAdmin.jsx';

class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usertype: ''
		};
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
  }

  handleUserTypeChange(event) {
    this.setState({usertype: event.target.value});
    console.log('this.state.usertype handleUserSubmit', this.state.usertype);
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (<Redirect to="login"/>)
    } else {
      if (this.state.usertype === '') {
        console.log('this.state.usertype', this.state.usertype);
        return (
          <div>
            <h2> Create User </h2>
            <form> 
              <select onChange={this.handleUserTypeChange} value={this.state.value}>
                <option value="" defaultValue> Please Choose </option>
                <option value='teacher'> Teacher </option>
                <option value='parent'> Parent </option>  
                <option value='student'> Student </option>  
              </select>
              <br></br>
              <button type="button" onSubmit={this.handleSubmit}> Submit </button>
            </form>
          </div>
        )
      } else if (this.state.usertype === 'teacher') {
        return (
          <div>
            <TeacherAdmin />
          </div>
        )
      } else if (this.state.usertype === 'parent') {
        return (
          <div>
            <ParentAdmin />
          </div>
        )
      } else if (this.state.usertype === 'student') {
        return (
          <div>
            <StudentAdmin />
          </div>
        )
      }
    }
  }
}





export default CreateUser;  