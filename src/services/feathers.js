import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, AsyncStorage } from "react-native";

import io from "socket.io-client";
import feathers from "@feathersjs/feathers";
import socketio from "@feathersjs/socketio-client";
import authentication from "@feathersjs/authentication-client";
const API_URL = "http://192.168.0.21:3030";

let instance = null;

class FeatherService {
  constructor() {
    if (!instance) {
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

      instance = this;
    }
    return instance;
  }

  getAccessToken() {
    return this.app.get("accessToken");
  }

  connect() {
    this.app.io.on("connect", () => {
      console.log("connected");
    });

    this.app.io.on("disconnect", () => {
      console.log("disconnected");
    });
  }

  login(email, password) {
    console.log(email);
    const payload = {
      strategy: "local",
      email,
      password
    };
    return this.authenticate(payload);
  }

  authenticate(options) {
    options = options ? options : undefined;
    console.log(options);
    return this._authenticate(options)
      .then(user => {
        console.log("authenticated successfully", user._id, user.email);
        return Promise.resolve(user);
      })
      .catch(error => {
        console.log("authenticated failed", error.message);
        console.log(error);
        return Promise.reject(error);
      });
  }

  _authenticate(payload) {
    console.log(payload);
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

  createAccount(firstname, lastname, email, password) {
    const userData = { firstname, lastname, email, password };
    return this.app.service('users').create(userData);
  }

  logout() {
    return this.app.logout();
  }
}

const featherService = new FeatherService();
export default featherService;
