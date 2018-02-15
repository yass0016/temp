import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { signup, firstNameChanged, lastNameChanged, emailChanged, passwordChanged } from "../redux/actions/auth";

class Register extends Component {

  onFirstNameChanged(firstname) {
    this.props.firstNameChanged(firstname);
  }

  onLastNameChanged(lastname) {
    this.props.lastNameChanged(lastname);
  }

  onEmailChanged(email) {
    this.props.emailChanged(email);
  }

  onPasswordChanged(password) {
    this.props.passwordChanged(password);
  }

  userRegister() {
    let auth = {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      email: this.props.email,
      password: this.props.password
    };

    this.props.signup(auth);
  };

  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="name-phone-pad"
          returnKeyType="next"
          placeholder="First Name"
          onChangeText={this.onFirstNameChanged.bind(this)}
          value={this.props.firstname}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="name-phone-pad"
          returnKeyType="next"
          placeholder="Last Name"
          onChangeText={this.onLastNameChanged.bind(this)}
          value={this.props.lastname}
        />

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
          onPress={this.userRegister.bind(this)}
          title="Register"
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text>{this.props.error}</Text>
      </ScrollView>
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    firstname: state.auth.firstname,
    lastname: state.auth.lastname,
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

export default connect(mapStateToProps, { firstNameChanged, lastNameChanged, emailChanged, passwordChanged, signup })(Register);
