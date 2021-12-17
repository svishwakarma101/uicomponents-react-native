import React from 'react';
import { Linking, Platform, NativeModules } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import UISnackBar from './index';

const errorMessage = 'Unable to connect to the internet';

export default class UINetworkSnackBar extends React.Component {
  state = { position: 'bottom', isConnected: true };

  componentWillMount() {
    // NetInfo.isConnected.addEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange
    // );
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange)
  }

  componentWillUnmount() {
    // NetInfo.isConnected.removeEventListener(
    //   'connectionChange',
    //   this.handleConnectivityChange
    // );
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  handleConnectivityChange = isConnected => {
    if (this.state.isConnected !== isConnected) {
      this.setState({ isConnected });
    }
  };

  actionHandler = () => {
    if (Platform.OS === 'ios') {
      Linking.openURL('app-settings:');
    } else {
      if (NativeModules.OpenSettings) {
        NativeModules.OpenSettings.openNetworkSettings(() => {});
      }
    }
  };

  render() {
    return (
      <UISnackBar
        {...this.props}
        visible={!this.state.isConnected}
        actionHandler={this.actionHandler}
        message={errorMessage}
        actionButtonTitle={'SETTINGS'}
        type={'native'}
      />
    );
  }
}
