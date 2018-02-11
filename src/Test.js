import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";

import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";
const API_URL = "http://192.168.0.21:3030";

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isAuthenticated: false
    };
  }

  connect() {
    this.isConnecting = true;

    this.app.io.on("connect", () => {
      this.isConnecting = false;

      this.authenticate({
        strategy: "local",
        email: "yass0016@gmail.com",
        password: "1"
      })
        .then(() => {
          console.log("authenticated after reconnection");
        })
        .catch(error => {
          console.log("error authenticating after reconnection", error);
        });
    });

    this.app.io.on("disconnect", () => {
      console.log("disconnected");
      this.isConnecting = true;
    });
  }

  login(email, password) {
    const payload = {
      strategy: "local",
      email,
      password
    };
    return this.authenticate(payload);
  }

  authenticate(options) {
    options = options ? options : undefined;
    return this._authenticate(options)
      .then(user => {
        console.log("authenticated successfully", user._id, user.email);
        this.user = user;
        this.isAuthenticated = true;

        this.setState({
          user,
          isAuthenticated: true
        });

        return Promise.resolve(user);
      })
      .catch(error => {
        console.log("authenticated failed", error.message);
        console.log(error);
        return Promise.reject(error);
      });
  }

  _authenticate(payload) {
    return this.app
      .authenticate(payload)
      .then(response => {
        return this.app.passport.verifyJWT(response.accessToken);
      })
      .then(payload => {
        return this.app.service("users").get(payload.userId);
      })
      .catch(e => Promise.reject(e));
  }

  componentDidMount() {
    const options = {
      transports: ["websocket"],
      pingTimeout: 3000,
      pingInterval: 5000
    };
    const socket = io(API_URL, options);

    this.app = feathers()
      .configure(socketio(socket))
      .configure(
        authentication({
          storage: AsyncStorage // To store our accessToken
        })
      );

    this.connect();

    if (this.app.get("accessToken")) {
      this.isAuthenticated = this.app.get("accessToken") !== null;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.user ? (
          <Text style={styles.welcome}>
            Welcome {this.user.firstname + " " + this.user.lastname}!
          </Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
