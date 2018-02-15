import React from 'react';
import { StyleSheet, TouchableOpacity, Button } from 'react-native';

export default {
  closeButton(goBack) {
    return (
      <TouchableOpacity>
        <Button style={styles.close} title='Go Back' onPress={() => goBack()} />
      </TouchableOpacity>
    )
  },

  settingsButton(navigate) {
    return (<TouchableOpacity>
      <Button style={styles.settings} title='Settings' onPress={() => navigate('Settings')} />
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  close: {
    marginLeft: 10,
    fontSize: 44,
    color: '#555'
  },
  settings: {
    marginRight: 10,
    fontSize: 28,
    color: '#555'
  }
});