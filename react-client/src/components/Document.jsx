import React from 'react';

class Document extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      permissioned: '',
      display: false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
    this.permissionedYes = this.permissionedYes.bind(this);
    this.permissionedNo = this.permissionedNo.bind(this);
  }

  toggleDisplay () {
    console.log('toggleDisplay invoked.');
    this.setState ({
      display: !this.state.display
    });
  }

  permissionedYes () {
    console.log('permissionedYes invoked.');
    this.setState ({
      permissioned: true
    });
  }

  permissionedNo () {
    console.log('permissionedNo invoked.');
    this.setState ({
      permissioned: false
    });
  }

  render () {
    if (this.state.permissioned === true) {
      return (
        <div>
          <h3 onClick={this.toggleDisplay}> {this.props.document.title} </h3>
          <span className={this.state.permissioned ? 'permissionedYes' : 'permissionedNo'}>&#10003;</span>
          <button type="button" onClick={this.permissionedYes} > Yes </button>
          <button type="button" onClick={this.permissionedNo}> No </button>
          <p className={this.state.display ? '' : 'hidden'}> {this.props.document.body} </p>
        </div>
      )
    } else if (this.state.permissioned === false) {
      return (
        <div>
          <h3 onClick={this.toggleDisplay}> {this.props.document.title} </h3>
          <span onClick={this.togglePermissioned}>&#10007;</span>
          <button type="button" onClick={this.permissionedYes} > Yes </button>
          <button type="button" onClick={this.permissionedNo}> No </button>
          <p className={this.state.display ? '' : 'hidden'} > {this.props.document.body} </p>
        </div>
      )      
    } else if (this.state.permissioned === '') {
      return (
        <div>
          <h3 onClick={this.toggleDisplay} > {this.props.document.title} </h3>
          <span onClick={this.togglePermissioned}>&#9998;</span>
          <button type="button" onClick={this.permissionedYes} > Yes </button>
          <button type="button" onClick={this.permissionedNo}> No </button>
          <p className={this.state.display ? '' : 'hidden'} > {this.props.document.body} </p>
        </div>
      )     
    }
  }
}

/*
Need to add CSS in stylesheet:
.hidden { display:none; }
*/

export default Document;