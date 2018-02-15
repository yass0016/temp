import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

import { connect } from 'react-redux';

class Start extends Component {
  static navigationOptions = {
    header: null
  };

  showLogin() {
    this.props.navigation.navigate('Login');
  }

  showRegister() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.tagline}>Waiting List</Text>
        </View>
        <View style={styles.bottomSection}>
          <Button title='Sign In'
            onPress={this.showLogin.bind(this)}
            backgroundColor='#BBB'
            buttonStyle={{ borderRadius: 5 }} />
          <Button title='Create Account'
            onPress={this.showRegister.bind(this)}
            backgroundColor='#31D8A0'
            buttonStyle={{ marginTop: 10, borderRadius: 5 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  logo: {
    resizeMode: 'contain',
    width: 280,
    height: 80
  },
  tagline: {
    marginTop: 5,
    fontSize: 28,
    fontWeight: '200',
    color: '#999'
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flex: 0,
    paddingBottom: 15
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 140
  },
});

const mapPropsToState = state => {
  console.log(state);
  return {

  };
};

export default connect(mapPropsToState)(Start);