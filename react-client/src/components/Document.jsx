import React from 'react';

class Document extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      permissioned: false,
      display: false
    };
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  toggleDisplay () {
    console.log('toggleDisplay invoked.');
    this.setState ({
      display: !this.state.display
    });
  }

  render () {
    if (this.state.permissioned) {
      return (
        <div>
          <h3>{this.props.document.title}</h3>
          <span>&#10003;</span>
          <p className={this.state.display ? '' : 'hidden'} onClick={this.toggleDisplay}>{this.props.document.body}</p>
        </div>
      )
    } else if (this.state.permissioned === false) {
      return (
        <div>
          <h3>{this.props.document.title}</h3>
          <span>&#10007;</span>
          <p className={this.state.display ? '' : 'hidden'} onClick={this.toggleDisplay}>{this.props.document.body}</p>
        </div>
      )      
    } else if (this.state.permissioned === undefined) {
      return (
        <div>
          <h3>{this.props.document.title}</h3>
          <span>&#9998;</span>
          <p className={this.state.display ? '' : 'hidden'} onClick={this.toggleDisplay}>{this.props.document.body}</p>
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