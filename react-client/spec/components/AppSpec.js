describe('Login', () => {
  const {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = React.addons.TestUtils;

  const app;

  it('should be a stateful class component.', () => {
    expect(React.Component.isPrototypeOf(Login)).to.be.true;
  });

});