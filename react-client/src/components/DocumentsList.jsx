import React from 'react';
import axios from 'axios';
import Document from './Document.jsx';
import CreateDocument from './CreateDocument.jsx';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

class DocumentsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      documents: [],
      variable: true
    };
    this.reRender = this.reRender.bind(this);
  }

  componentDidMount () {
    let currentToken = window.localStorage.accessToken;

    let config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('/doc/documents', config)
    .then(docs => {
      console.log('Retrieved docs back from GET /documents request.', docs);
      this.setState({
        documents: docs.data
      });
      // console.log('State with docs', this.state);
    })
    .catch(error => {
      console.log('Error retrieving docs back from GET /documents request.');
    });
  }


  reRender () {
    let currentToken = window.localStorage.accessToken;

    let config = {
      headers: {'Authorization': currentToken}
    };

    axios.get('/doc/documents', config)
    .then(docs => {
      console.log('Retrieved docs back from GET /documents request.', docs);
      this.setState({
        documents: docs.data
      });
      // console.log('State with docs', this.state);
    })
    .catch(error => {
      console.log('Error retrieving docs back from GET /documents request.');
    });
  }


  render () {
    console.log('type of user logged in', this.props.userType);
    if (!this.props.isLoggedIn) {
      return (<Redirect to="login" />)
    } else {
      if (this.props.userType === 'teacher') {
        return (
          <div>
            <h2>Permission slips</h2>
            <Link to="/documents/createDocument">Create Document</Link>
            <Route name="createDocument" path="/documents/createDocument" component={() => (<CreateDocument userType={this.props.userType} reRender={this.reRender}/>)} />
            {this.state.documents.map((doc, index) => 
              <Document document={doc} key={index} reRender={this.reRender}/>
            )}
          </div>
        )    
      } else {
        return (
          <div>
            <h2>Permission slips</h2>
            {this.state.documents.map((doc, index) => 
              <Document document={doc} key={index}/>
            )}
          </div>
        )    
      }
    }
  }
}

export default DocumentsList;