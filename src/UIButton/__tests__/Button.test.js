import React from 'react'
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import UIButton from '..'
import sinon from 'sinon'

describe('UIButton ', () => {
  it('Renders UIButton for default scenarios correctly ', () => {
    let fieldValue = renderer.create(<UIButton/>)
    expect(fieldValue).toMatchSnapshot()
  });

  it('renders UIButton of type Primary correctly', () => {
    const component = renderer.create(<UIButton buttonType={'primary'}/>)
    expect(component).toMatchSnapshot()
  });

  it('renders UIButton of type Secondary correctly ', () => {
    const component = renderer.create(<UIButton buttonType={'secondary'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of type Disabled correctly ', () => {
    const component = renderer.create(<UIButton buttonType={'disabled'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of type Gradient correctly ', () => {
    const component = renderer.create(<UIButton buttonType={'gradient'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of type Transparent correctly ', () => {
    const component = renderer.create(<UIButton buttonType={'transparent'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of shape Square correctly ', () => {
    const component = renderer.create(<UIButton buttonShape={'square'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of shape Rounded correctly ', () => {
    const component = renderer.create(<UIButton buttonShape={'rounded'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of shape RoundedEdge correctly ', () => {
    const component = renderer.create(<UIButton buttonShape={'roundedEdge'} />);
    expect(component).toMatchSnapshot();
  });

  it('renders UIButton of prop disabled', () => {
    const component = renderer.create(<UIButton disabled/>)
    expect(component).toBeTruthy()
  });

  it('renders UIButton for prop leftIconPosition', () => {
    const component = shallow(<UIButton iconLeftPositioned/>)
    expect(component).toBeTruthy()
  })

  it('To verify UIButton actions are called when button is clicked', () => {
    const btnPressedIn = jest.fn()
    const btnPressedOut = jest.fn()

    const component = shallow(<UIButton onPressIn={btnPressedIn} onPressOut={btnPressedOut}/>)

    const button = component.find('TouchableOpacity');
    button.simulate('pressIn')
    expect(btnPressedIn).toHaveBeenCalled()

    button.simulate('pressOut');
    expect(btnPressedOut).toHaveBeenCalled()
  })

  it('To verify whether UIButton actions are called when disabled props is received', () => {
    const btnPressedIn=jest.fn();
    const btnPressedOut=jest.fn();

    const component= shallow(<UIButton disabled/>)
    
    const button = component.find('TouchableOpacity');
    button.simulate('pressIn')
    expect(btnPressedIn).not.toHaveBeenCalled()

    button.simulate('pressOut')
    expect(btnPressedOut).not.toHaveBeenCalled()
  })
})
