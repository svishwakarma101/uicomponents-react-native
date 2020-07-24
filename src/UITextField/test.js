import React from 'react';
import renderer from 'react-test-renderer';
import {shallow} from 'enzyme';
import UITextField from '.';

import searchIcon from '../../assets/images/button/searchIcon.png';


const props = {
    label: 'test',
    input: {value:'text'} 
  };
  

  it('renders', ()=>{
    let field = renderer.create(<UITextField {...props} autoFocus={false} />).toJSON();
    expect(field).toMatchSnapshot()
  })

  it('renders value', () => {
    let field = shallow(<UITextField {...props} value='text' onFocus={jest.fn()} />);
    expect(field).toMatchSnapshot();
  });

  it('renders type date', () => {
    let field = shallow(<UITextField {...props} type='date' underlineType='custom' />);
    expect(field).toMatchSnapshot();
  });

  it('renders type shortDate', () => {
    let field = shallow(<UITextField {...props} type='shortDate' />);
    expect(field).toMatchSnapshot();
    field.find('TextField').simulate('focus', 'test search text');
  });

  it('renders type monthYearShortDate', () => {
    let field = shallow(<UITextField {...props} type='monthYearShortDate' />);
    expect(field).toMatchSnapshot();
    field.find('TextField').simulate('blur', 'test search text');
  });

  it('renders type monthYearDate', () => {
    let field = shallow(<UITextField {...props} type='monthYearDate' />);
    expect(field).toMatchSnapshot();
  });

  it('renders disabled value', () => {
    let field = shallow(<UITextField {...props} value='text' disabled />);
    expect(field)
      .toMatchSnapshot();
  });
  
  it('renders label', () => {
    let field = shallow(<UITextField {...props} floatingLabel={'Name'} isFloating={true} />)  
    expect(field).toMatchSnapshot();
  });
  
  it('renders multiline value', () => {
    let field = shallow(<UITextField {...props} value='text' multiline />)  
    expect(field).toMatchSnapshot();
  });

  it('renders error message', () => {
    let field = shallow(<UITextField {...props} errorMessage='Something went wrong' />)  
    expect(field).toMatchSnapshot();
  });

  it('renders left accessory', () => {
    let render = () => (
      <Image />
    );
  
    let field = shallow(<UITextField {...props} renderRightAccessory={render} />)
    expect(field).toMatchSnapshot();
  });

  it('renders Clear Button', () => {
    let field = shallow(<UITextField {...props} showClearButton={true} />)  
    expect(field).toMatchSnapshot();
  });

  it('renders show Button', () => {
    let field = shallow(<UITextField {...props} showShowHideButton={true} />)  
    expect(field).toMatchSnapshot();
  });

  it('renders show and clear Button', () => {
    let field = shallow(<UITextField {...props} showShowHideButton={true} showClearButton={true} />)  
    expect(field).toMatchSnapshot();
  });

  it('renders search Button', () => {
    let field = shallow(<UITextField {...props} showLeftSearchButton={true} />)  
    expect(field).toMatchSnapshot();
  });

  it('renders round shape', ()=>{
    let field = renderer.create(<UITextField {...props} shape={"round"}/>).toJSON();
    expect(field).toMatchSnapshot()
  })

  it('should call onFocus and onBlur', () => {
    // Arrange
    const mockOnFocus = jest.fn();      // 1. mock function
    const mockOnBlur = jest.fn();
    const wrapper = shallow(<UITextField {...props} onFocus={mockOnFocus} onBlur={mockOnBlur} />);
    wrapper.find('TextField').simulate('focus', 'test search text');
    expect(mockOnFocus).toHaveBeenCalled();
    wrapper.find('TextField').simulate('blur', 'test search text');
    expect(mockOnBlur).toHaveBeenCalled();
});

