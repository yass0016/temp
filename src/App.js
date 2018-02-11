import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";

import store from "./redux";

import Login from './components/Login';
import Register from './components/Register'

const App = () => {
  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <Register />
      </View>
    </Provider>
  );
};

export default App;
