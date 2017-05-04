import React from 'react';

class Login extends React.Component {
	constructor (props) {
		super (props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
	}

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
    console.log('handleUsernameChange invoked', event.target.value);
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
    console.log('handlePasswordChange invoked', event.target.value);
  }

  handleSubmit() {
    this.props.enterCredentials(this.state.username, this.state.password);
  }

  render() {
    return (
      <div>
        <img src="stock_logo.jpg" height="200" width="200"></img>
        <h1> Welcome to Skooled! </h1>
        <form>
          <label>
            Username:
            <input type="text" value={this.state.username} onChange={this.handleUsernameChange} />
          </label>
          <br></br>
          <label>
            Password:
            <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
          </label>
          <br></br>
          <button type="button" onSubmit={this.handleSubmit}> Submit </button>
        </form>
      </div>
    );
  }
}

export default Login;