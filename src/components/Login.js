import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { login } from "../redux/actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  userLogin(e) {
    this.props.login(this.state.username, this.state.password);
    e.preventDefault();
  }

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          onChangeText={(text) => this.setState({ username: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={e => this.userLogin(e)}
          title="Login"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => {
      dispatch(login(username, password));
    }
  };
};

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  input: {
    height: 40,
    backgroundColor: "rgba(225,225,225,0.2)",
    marginBottom: 10,
    padding: 10,
    color: "#000"
  },
  buttonContainer: {
    backgroundColor: "#2980b6",
    paddingVertical: 15
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
