import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Document from '../../components/Document';
import renderer from 'react-test-renderer';

const example = {
  id: 1,
  title: 'Pizza making class',
  body: 'For pizza lovers to create a pizza and donate it to charity.',
  first_name_student: 'Emma',
  last_name_student: 'Frost',
  id_student: 4,
  permissioned: true
};

const example2 = {
  id: 2,
  title: 'Swing dancing',
  body: 'This is an introductory dance class for interested students.',
  first_name_student: 'Gisele',
  last_name_student: 'Bunchan',
  id_student: 12,
  permissioned: false
};

const example3 = {
  id: 100,
  title: 'Science museum visit',
  body: 'Class 5 will attend the Science museum downtown for the whole day of December 3rd 2017.',
  first_name_student: 'Green',
  last_name_student: 'Lantern',
  id_student: 99,
  permissioned: null
}



test('Document should display the title of the rendered document from the database.', () => {

  // Temporarily render the above example document as part of the <Document/> component.
  const doc = TestUtils.renderIntoDocument(<Document document={example} userType='teacher'/>);

  // After rendering <Document/>, find the <h3> html element, which should contain the title.
  const exampleElement = TestUtils.findRenderedDOMComponentWithTag(doc, 'h3');
  // const docNode = ReactDOM.findDOMNode(doc);

  // Verify that the component has an h3 title.
  expect(exampleElement.textContent).toEqual(' Pizza making class ');
});



test('Document should have a Yes button for a yes permission.', () => {
  const doc = TestUtils.renderIntoDocument(<Document document={example} userType='parent'/>);
  const yesButtonElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'yesButton');
  expect(yesButtonElement.textContent).toEqual(' Yes ');
});



test('Document should have a No button for a no permission.', () => {
  const doc = TestUtils.renderIntoDocument(<Document document={example2} userType='parent'/>);
  const noButtonElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'noButton');
  expect(noButtonElement.textContent).toEqual(' No ');
});



test('Document should display the body of document.', () => {
  const doc = TestUtils.renderIntoDocument(<Document document={example2} userType='parent'/>);
  const hiddenElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'hidden');
  expect(hiddenElement.textContent).toEqual(' This is an introductory dance class for interested students. ');
});



test('Permission status should change to ✓ when yes button clicked.', () => {
  const doc = TestUtils.renderIntoDocument(<Document document={example2} userType='parent'/>);

  // Render the document to have all default states of commponent populated.
  const docNode = ReactDOM.findDOMNode(doc);

  const yesButtonElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'yesButton');
  const permissionNoElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'permissionedNo');
  
  // Before yes button clicked.
  expect(permissionNoElement.textContent).toBe('✗');

  // Click yes button.
  TestUtils.Simulate.click(yesButtonElement);

  // The class of the relevant element will change to 'permissionedYes' once clicked.
  const permissionYesElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'permissionedYes');

  // After yes button clicked.
  expect(permissionYesElement.textContent).toBe('✓');

});



test('Permission status should change to ✗ when no button clicked.', () => {
  const doc = TestUtils.renderIntoDocument(<Document document={example} userType='parent'/>);

  // Render the document to have all default states of commponent populated.
  const docNode = ReactDOM.findDOMNode(doc);

  const noButtonElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'noButton');
  const permissionYesElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'permissionedYes');
  
  // Before yes button clicked.
  expect(permissionYesElement.textContent).toBe('✓');

  // Click yes button.
  TestUtils.Simulate.click(noButtonElement);

  // The class of the relevant element will change to 'permissionedYes' once clicked.
  const permissionNoElement = TestUtils.findRenderedDOMComponentWithClass(doc, 'permissionedNo');

  // After yes button clicked.
  expect(permissionYesElement.textContent).toBe('✗');

});



test('Element class of document body changes from hidden to null when title is clicked', () => {
  const doc = TestUtils.renderIntoDocument(<Document document={example3} userType='parent'/>);
  const docNode = ReactDOM.findDOMNode(doc);
  const clickableDocTitle = TestUtils.findRenderedDOMComponentWithTag(doc, 'h3');
  const docBody = TestUtils.findRenderedDOMComponentWithClass(doc, 'hidden');

  // Before title is clicked.
  expect(docBody.classList.contains('hidden')).toBe(true);

  // Click the title action.
  TestUtils.Simulate.click(clickableDocTitle);

  // After title is clicked.
  expect(docBody.classList.contains('hidden')).toBe(false);
});