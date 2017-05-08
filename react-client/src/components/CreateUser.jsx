import React from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usertype: ''
		};
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserTypeChange(event) {
    this.setState({usertype: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

  }

  render() {
    if (this.state.usertype === '') {
      return (
        <div>
          <h3> Create User </h3>
          <form> 
            <select placeholder='Choose Type'>
              <option value={this.state.usertype} onChange={this.handleUserTypeChange}> Teacher </option>
              <option value={this.state.usertype} onChange={this.handleUserTypeChange}> Parent </option>  
            </select>
            <br></br>
            <button type="button" onSubmit={this.handleSubmit}> Submit </button>
          </form>
        </div>
      )
    }
  }
}

export default CreateUser;  