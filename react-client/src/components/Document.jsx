import React from 'react';
import axios from 'axios';

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

  componentDidMount () {
    if (this.props.document.permissioned !== null) {
      this.setState ({
        permissioned: this.props.document.permissioned
      });
    }
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
    const permissionSlip = {
      docId: this.props.document.id,
      permissioned: true
    };
    axios.put('/doc/documents', permissionSlip)
    .then(response => {
      console.log('Updated permission status on slip!');
      // this.props.reRender();
    })
    .catch(error => {
      console.error('Error updating permission status on slip.');
    });
  }

  permissionedNo () {
    console.log('permissionedNo invoked.');
    this.setState ({
      permissioned: false
    });
    const permissionSlip = {
      docId: this.props.document.id,
      permissioned: false
    };
    axios.put('/doc/documents', permissionSlip)
    .then(response => {
      console.log('Updated permission status on slip!');
      // this.props.reRender();
    })
    .catch(error => {
      console.error('Error updating permission status on slip.');
    });
  }

  render () {
    console.log('this.props.document.permissioned', this.props.document.permissioned);
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