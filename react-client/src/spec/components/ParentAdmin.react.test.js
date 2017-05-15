import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ParentAdmin from '../../components/ParentAdmin';
import renderer from 'react-test-renderer';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';


describe ('<ParentAdmin />', () => {
  const shallowWrapper = shallow(<ParentAdmin />);
  const deepWrapper = mount(<ParentAdmin />);
  const studentList = ['Gregory Windsor', 'Andrew Appleton', 'Josephine Hendry', 'Leslie Goldberg', 'Oscar Wilde'];


  test('ParentAdmin updates its state when first name is typed.', () => {
    const parentAdmin = TestUtils.renderIntoDocument(<ParentAdmin />);
    const parentAdminNode = ReactDOM.findDOMNode(parentAdmin);
    const parentFirstNameTextFieldElement = TestUtils.findRenderedDOMComponentWithClass(parentAdmin, 'parentFirstNameInput');
    
    TestUtils.Simulate.change(parentFirstNameTextFieldElement, {target: {value: 'Francessca'}});
    console.log('ROLL2', parentFirstNameTextFieldElement);
    expect(parentAdmin.state.firstName).toEqual('Francessca');
  });



  test('ParentAdmin updates its state when last name is typed.', () => {
    const parentAdmin = TestUtils.renderIntoDocument(<ParentAdmin />);
    const parentAdminNode = ReactDOM.findDOMNode(parentAdmin);
    const parentLastNameInputElement = TestUtils.findRenderedDOMComponentWithClass(parentAdmin, 'parentLastNameInput');

    TestUtils.Simulate.change(parentLastNameInputElement, {target: {value: 'Antonio'}});

    expect(parentAdmin.state.lastName).toEqual('Antonio');
  });



  test('Role state of ParentAdmin should automatically be parent.', () => {
    const parentAdmin = TestUtils.renderIntoDocument(<ParentAdmin />);
    const parentAdminNode = ReactDOM.findDOMNode(parentAdmin);
    expect(parentAdmin.state.role).toEqual('parent');
  });


  // test('ParentAdmin should populate list of student names in selection field.', () => {
  //   // const parentAdmin = TestUtils.renderIntoDocument(<ParentAdmin />);
  //   const spy = jest.fn();
  //   const componentDidMount = ParentAdmin.prototype.componentDidMount;
  //   ParentAdmin.prototype.componentDidMount = function() {
  //     spy();
  //     componentDidMount();
  //   };
  //   console.log('PLANTAIN', componentDidMount);
  //   console.log('HAMBURGER', wrapper);

  //   // expect(ParentAdmin._state.students).toBe(['Gregory Windsor', 'Andrew Appleton', 'Josephine Hendry', 'Leslie Goldberg', 'Oscar Wilde']);
  //   expect(ParentAdmin.prototype.componentDidMount.mock.calls.length).toBe(1);
  // });

  // test('calls componentDidMount', () => {
  //   const wrapper = mount(<ParentAdmin />);
  //   expect(wrapper.prototype.componentDidMount.mock.calls.length).toBe(true);
  // })
});