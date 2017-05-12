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
        <div className="doc">
          <h3 onClick={this.toggleDisplay}> {this.props.document.title} </h3>
          <p>{this.props.document.first_name_student} {this.props.document.last_name_student}</p>
          <p className={this.state.permissioned ? 'permissionedYes' : 'permissionedNo'}>&#10003;</p>
          <button type="button" onClick={this.permissionedYes} > Yes </button>
          <button type="button" onClick={this.permissionedNo}> No </button>
          <p className={this.state.display ? '' : 'hidden'}> {this.props.document.body} </p>
        </div>
      )
    } else if (this.state.permissioned === false) {
      return (
        <div className="doc">
          <h3 onClick={this.toggleDisplay}> {this.props.document.title} </h3>
          <p>{this.props.document.first_name_student} {this.props.document.last_name_student}</p>
          <p className={this.state.permissioned ? 'permissionedYes' : 'permissionedNo'}>&#10007;</p>
          <button type="button" onClick={this.permissionedYes} > Yes </button>
          <button type="button" onClick={this.permissionedNo}> No </button>
          <p className={this.state.display ? '' : 'hidden'} > {this.props.document.body} </p>
        </div>
      )      
    } else if (this.state.permissioned === '') {
      return (
        <div className="doc">
          <h3 onClick={this.toggleDisplay} > {this.props.document.title} </h3>
          <p>{this.props.document.first_name_student} {this.props.document.last_name_student}</p>
          <p className={this.state.permissioned ? 'permissionedYes' : 'permissionedNo'}>&#9998;</p>
          <button type="button" onClick={this.permissionedYes} > Yes </button>
          <button type="button" onClick={this.permissionedNo}> No </button>
          <p className={this.state.display ? '' : 'hidden'} > {this.props.document.body} </p>
        </div>
      )     
    }
  }
}

export default Document;