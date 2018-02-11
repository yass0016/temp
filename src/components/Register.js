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
import { signup } from "../redux/actions/auth";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: ""
    };
  }

  userRegister(e) {
    this.props.signup(
      this.state.firstname,
      this.state.lastname,
      this.state.username,
      this.state.password
    );
    e.preventDefault();
  }

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
          onChangeText={text => this.setState({ firstname: text })}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="name-phone-pad"
          returnKeyType="next"
          placeholder="Last Name"
          onChangeText={text => this.setState({ lastname: text })}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          returnKeyType="next"
          placeholder="Email"
          onChangeText={text => this.setState({ username: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => this.setState({ password: text })}
        />

        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={e => this.userRegister(e)}
          title="Register"
        >
          <Text style={styles.buttonText}>Sign Up</Text>
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
    signup: (firstname, lastname, username, password) => {
      dispatch(signup(firstname, lastname, username, password));
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
