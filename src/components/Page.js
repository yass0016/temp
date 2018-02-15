import React, { Component } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native';

import NavIcons from '../components/NavIcons';

import { connect } from 'react-redux';

const maxHeight = Platform.OS === 'ios' ? Dimensions.get('window').height - 65 : Dimensions.get('window').height - 85;

class Page extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Secure Page',
    headerRight: NavIcons.settingsButton(navigation.navigate),
    gesturesEnabled: false
  });

  componentDidMount() {

  }

  render() {
    return (
      <View style={styles.container}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white'
  },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 5,
    backgroundColor: '#E98B50',
    opacity: 0.8
  },
  bannerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 13,
    textAlign: 'center'
  },
  settings: {
    marginRight: 10
  }
});

const mapPropsToState = state => {
  console.log(state);
  return {

  };
};

export default connect(mapPropsToState)(Page);