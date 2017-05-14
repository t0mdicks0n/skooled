import React from 'react';
import TeacherAdmin from './TeacherAdmin.jsx';
import ParentAdmin from './ParentAdmin.jsx';
import StudentAdmin from './StudentAdmin.jsx';

import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  customWidth: {
    width: 200,
  },
};

const style = {
  margin: 12,
};

class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			usertype: ''
		};
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
  }

  handleUserTypeChange(event, index, value) {
    this.setState({usertype: value});
  }

  render() {
    if (this.state.usertype === '') {
      return (
        <div>
          <h2> Create User </h2>
          <DropDownMenu onChange={this.handleUserTypeChange} value="Please choose">
            <MenuItem value={'Please choose'} primaryText="Please choose" />
            <MenuItem value={'teacher'} primaryText="Teacher" />
            <MenuItem value={'parent'} primaryText="Parent" />
            <MenuItem value={'student'} primaryText="Student" />
          </DropDownMenu>
        </div>
      )
    } else if (this.state.usertype === 'teacher') {
      return (
        <div>
          <TeacherAdmin />
        </div>
      )
    } else if (this.state.usertype === 'parent') {
      return (
        <div>
          <ParentAdmin />
        </div>
      )
    } else if (this.state.usertype === 'student') {
      return (
        <div>
          <StudentAdmin />
        </div>
      )
    }
  }
}

export default CreateUser;