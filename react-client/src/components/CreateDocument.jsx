import React from 'react';
import axios from 'axios';

class CreateDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleBodyChange = this.handleBodyChange.bind(this);
    this.createDoc = this.createDoc.bind(this);
  }

  handleTitleChange (event) {
    console.log('this.state.title', this.state.title);
    this.setState ({
      title: event.target.value
    });
    event.preventDefault();
  }

  handleBodyChange (event) {
    console.log('this.state.body', this.state.body);
    this.setState ({
      body: event.target.value
    });
    event.preventDefault();
  }

  createDoc () {
    console.log('createDoc invoked');
    var currentToken = window.localStorage.accessToken;

    var config = {
      headers: {'Authorization': currentToken}
    };

    axios.post('/doc/documents', this.state, config)
    .then(response => {
      window.alert('Document created in database!');
      this.props.reRender();
    })
    .catch(error => {
      window.alert('Error creating document in database.')
    });
  }

  render () {
    return (
      <div>
        <h2>Enter New Document Information</h2>
        <form>
          <label>Title:</label>
          <input className="createDocumentTitle" onChange={this.handleTitleChange} value={this.state.title} placeholder="Title goes here"/>
          <br></br>
          <label>Body:</label> 
          <input className="createDocumentBody" onChange={this.handleBodyChange} value={this.state.body} placeholder="Body goes here"/>
          <br></br>
          <button type="button" onClick={this.createDoc}>Submit document</button>
        </form>
      </div>
    )
  }
}

export default CreateDocument;