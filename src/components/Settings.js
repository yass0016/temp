import React, { Component } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/auth';

import NavIcons from '../components/NavIcons';

import { NavigationActions } from 'react-navigation';

class Settings extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Settings',
    headerLeft: NavIcons.closeButton(navigation.goBack)
  });

  promptForLogout() {
    this.props.logout();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.email}>{this.props.user.email}</Text>
        </View>
        <View style={styles.bottomSection}>
          <Button title='Sign Out'
            onPress={this.promptForLogout.bind(this)}
            buttonStyle={styles.signoutButton} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatar: {
    resizeMode: 'contain',
    width: 100,
    height: 100,
    borderRadius: 50
  },
  email: {
    marginTop: 40,
    fontSize: 20,
    fontWeight: "200",
    color: '#333'
  },
  bottomSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 15,
  },
  signoutButton: {
    borderRadius: 5,
    borderWidth: 0,
    borderColor: '#777'
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
  }
});

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);