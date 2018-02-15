import React, { Component } from "react";
import { connect } from "react-redux";
import { ScrollView, Text, TextInput, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { login, emailChanged, passwordChanged } from "../redux/actions/auth";

class Login extends Component {
  onEmailChanged(email) {
    this.props.emailChanged(email);
  }

  onPasswordChanged(password) {
    this.props.passwordChanged(password);
  }

  userLogin() {
    let auth = {
      email: this.props.email,
      password: this.props.password
    };
    this.props.login(auth.email, auth.password);
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
          onChangeText={this.onEmailChanged.bind(this)}
          value={this.props.email}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={this.onPasswordChanged.bind(this)}
          value={this.props.password}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={this.userLogin.bind(this)}
          title="Login"
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text>{this.props.error}</Text>

      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error
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

export default connect(mapStateToProps, { emailChanged, passwordChanged, login })(Login);
