import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import Start from './Start';
import Login from './Login';
import Register from './Register';
import Page from './Page';
import Settings from './Settings';

const UnauthenticatedNavigator = StackNavigator({
  Start: { screen: Start },
  Login: { screen: Login },
  Register: { screen: Register }
}, { mode: 'modal' });

const MainNavigator = StackNavigator({
  Page: { screen: Page },
  Settings: { screen: Settings }
}, { mode: 'modal' });

class Navigation extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.auth.isLoggedIn ? <MainNavigator /> :
          <UnauthenticatedNavigator />}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Navigation);