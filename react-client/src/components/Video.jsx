import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';
var PUBNUB_PUBLISH_KEY = 'pub-c-49c10967-3fa1-4e45-a8cf-e3f3f66bb3d1';
var PUBNUB_SUBSCRIBE_KEY = 'sub-c-aefb4450-2f44-11e7-9a1a-0619f8945a4f';
// var PUBNUB_PUBLISH_KEY = process.env.PUBNUB_PUBLISH_KEY || require('../../../services/config/config.js').PUBNUB_PUBLISH_KEY;
// var PUBNUB_SUBSCRIBE_KEY = process.env.PUBNUB_SUBSCRIBE_KEY || require('../../../services/config/config.js').PUBNUB_SUBSCRIBE_KEY;

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
        subscribe_key : PUBNUB_SUBSCRIBE_KEY,
        ssl : (('https:' == document.location.protocol) ? true : false)
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
    var currentToken = window.localStorage.accessToken;
    var config = {
      headers: {
        'Authorization': currentToken,
        'username': this.state.dialeduser
      }
    };

    axios.get('/video/userdata', config)
    .then(response => {
      phone.dial(response.data.id);
    })
    .catch(error => {
      console.log('error, received no response from server');
      alert('Please submit a valid email address.');
    });
  }

  endCall() {
    phone.hangup();
  }

  render() {
    return (
      <div>
        <h2> Video Chat </h2>
        <form name="callForm" id="call-form" onChange={this.handleChange}>
          <div id="vid-div">
            <input type="text" placeholder="Enter Email to dial!" />
            <button type="button" class="btn" onClick={this.handleSubmit}> 
              <span className="glyphicon glyphicon-facetime-video"></span> Call 
            </button>
            <button type="button" id="end-call"  onClick={this.endCall}>
              <span className="glyphicon glyphicon-stop"></span> End Call
            </button>
          </div>
        </form>
        <div id="vid-box"></div>
        <div id="vid-thumb"></div>
      </div>
    )
  }
}

export default Video;


//         </a>