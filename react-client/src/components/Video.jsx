import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class Video extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username:'',
      phone: undefined
		};
  }

  componentWillMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('checkOnClientLoad', config)
    .then(response => {
      this.setState({username: response.data.userid});
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
  }

  componentDidMount() {
		var phone = window.phone = PHONE({
		    number        : this.state.username,
		    publish_key   : 'pub-c-49c10967-3fa1-4e45-a8cf-e3f3f66bb3d1',
		    subscribe_key : 'sub-c-aefb4450-2f44-11e7-9a1a-0619f8945a4f'
		});	
		phone.ready(function(){});
		phone.receive(function(session){
		    session.connected(function(session) { video_out.appendChild(session.video); });
		    session.ended(function(session) { video_out.innerHTML=''; });
		});
    this.setState({phone: phone});
  }


	login(form) {
		var phone = window.phone = PHONE({
		    number        : form.username.value || "Anonymous", // listen on username line else Anonymous
		    publish_key   : 'pub-c-49c10967-3fa1-4e45-a8cf-e3f3f66bb3d1',
		    subscribe_key : 'sub-c-aefb4450-2f44-11e7-9a1a-0619f8945a4f'
	   //  	oneway        : true,
				// ssl	: (('https:' == document.location.protocol) ? true : false),
		});	
		phone.ready(function(){ form.username.style.background="#55ff5b"; });
		phone.receive(function(session){
		    session.connected(function(session) { video_out.appendChild(session.video); });
		    session.ended(function(session) { video_out.innerHTML=''; });
		});
		return false; 	// So the form does not submit.
	}

	makeCall(form) {
		if (!window.phone) alert("Login First!");
		else phone.dial(form.number.value);
		return false;
	}

  handleSubmit() {

  }

  render() {
    if (!this.props.isLoggedIn) {
      return (<Redirect to="login" />)
    } else {
      return (
  			<div id="vid-box">

  			{/*<form name="loginForm" id="login" action="#" onsubmit="return login(this);">
  			      <input type="text" name="username" id="username" placeholder="Pick a username!" />
  			      <input type="submit" name="login_submit" value="Log In">
  			</form>*/}

  			<form name="callForm" id="call" action="#">
          <div>
  				  <input type="text" name="number" placeholder="Enter user to dial!" />
  				  {/*<input type="submit" value="Call"/>*/}
            <button type="button" onClick={this.handleSubmit}> Submit </button>
          </div>
  			</form>

        </div>
      )
    }
  }
}

export default Video;