import React from 'react';
import { withRouter } from 'react-router-dom';

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
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  componentWillMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit() {
    this.props.enterCredentials(this.state.username, this.state.password);
  }

  render() {
    return (
      <div className="main container-fluid col-md-12">
        <img src="stock_logo.jpg" height="200" width="200"></img>
        <h2> Welcome to Skooled! </h2>
        <form>
          <label>Username</label>
            <input type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange} />
          <br></br>
          <label>Password</label>
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} />
          <br></br>
          <button type="button" onClick={this.handleSubmit}> Submit </button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);