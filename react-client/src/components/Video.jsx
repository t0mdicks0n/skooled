import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
var PUBNUB_PUBLISH_KEY = process.env.PUBNUB_PUBLISH_KEY || require('../../../services/config/config.js').PUBNUB_PUBLISH_KEY;
var PUBNUB_SUBSCRIBE_KEY = process.env.PUBNUB_SUBSCRIBE_KEY || require('../../../services/config/config.js').PUBNUB_SUBSCRIBE_KEY;

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      dialeduser: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.configurePhone = this.configurePhone.bind(this);
  }

  componentDidMount() {
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('checkOnClientLoad', config)
    .then(response => {
      console.log('yalla', response.data.userid);
      this.configurePhone(response.data.userid);
      this.setState({userid: response.data.userid});
    })
    .catch(error => {
      console.log('error, received no response from server');
    });
  }

  configurePhone(userid) {
    var video_out = document.getElementById("vid-box");
    var vid_thumb = document.getElementById("vid_thumb");

    var phone = window.phone = PHONE({
        number        : userid,
        publish_key   : PUBNUB_PUBLISH_KEY,
        subscribe_key : PUBNUB_SUBSCRIBE_KEY
    });
    phone.ready(function(){});
    phone.receive(function(session){
      session.connected(function(session){
        video_out.appendChild(session.video);
      });
      session.ended(function(session){
        video_out.innerHTML='';
      });
    });

    function broadcast(vid) {
      var video = document.createElement('video');
      video.src = URL.createObjectURL(phone.mystream);
      video.volume = 0.0;
      video.play();
      video.setAttribute( 'autoplay', 'autoplay' );
      video.setAttribute( 'data-number', phone.number() );
      vid.style.cssText ="-moz-transform: scale(-1, 1); \
              -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); \
              transform: scale(-1, 1); filter: FlipH;";
      vid.appendChild(video);
    };

    broadcast(vid_thumb);
  }

  handleChange(event) {
    this.setState({dialeduser: event.target.value});
  }

  handleSubmit() {
    phone.dial(this.state.dialeduser);
  }

  endCall() {
    phone.hangup();
  }

  render() {
    if (!this.props.isLoggedIn) {
      return (<Redirect to="login" />)
    } else {
      return (
        <div>
          <form name="callForm" onChange={this.handleChange}>
            <div>
              <input type="text" placeholder="Enter user to dial!" />
              <button type="button" onClick={this.handleSubmit}> Call </button>
            </div>
          </form>
          <div id="vid-box"></div>
          <div id="vid-thumb"></div>
          <div id="inCall">
            <button id="end" onClick={this.endCall}>End</button>
          </div>
        </div>
      )
    }
  }
}

export default Video;