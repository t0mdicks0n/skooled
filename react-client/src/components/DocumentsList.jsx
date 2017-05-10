import React from 'react';
import axios from 'axios';
import Document from './Document.jsx';

class DocumentsList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      documents: [
      {
        id: 1,
        title: 'Museum trip',
        body: 'This trip shall take place on Tuesday 18th May. It will involve a whole day trip to the Natural History Museum.'
      },
      {
        id: 2,
        title: 'Football game',
        body: 'This sport fixture will take place between Florida High and Washington High.'
      }
      ],
    };
  }

  componentDidMount () {
    axios.get('/documents')
    .then(docs => {
      console.log('Retrieved docs back from GET /documents request.', docs);
      this.setState({
        documents: docs
      })
    })
    .error(error => {
      console.log('Error retrieving docs back from GET /documents request.')
    });
  }


  render () {
    return (
      <div>
        {this.state.documents.map((doc, index) => 
          <Document document={doc} key={index}/>
        )}
      </div>
    )    
  }
}

export default DocumentsList;