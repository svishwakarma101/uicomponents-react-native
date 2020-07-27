import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import UINativeSnackBar from './UINativeSnackBar';
import UICustomSnackBar from './UICustomSnackBar';

export default class UISnackBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 'bottom'
    };
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => this.setState({ position: 'top' });

  _keyboardDidHide = () => this.setState({ position: 'bottom' });

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
  }

  actionHandler = () => {
    const { actionHandler } = this.props;
    if (actionHandler && typeof actionHandler === 'function') {
      actionHandler();
    }
  };

  render() {
    const { type } = this.props;
    if (type === 'native') {
      return (
        <UINativeSnackBar
          {...this.props}
          position={this.state.position}
        />
      );
    } else {
      return (
        <UICustomSnackBar
          {...this.props}
          position={this.state.position}
        />
      );
    }
  }
}
