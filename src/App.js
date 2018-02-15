import React, { Component } from "react";
import { View } from "react-native";
import { Provider, connect } from "react-redux";

import { store, persistor } from "./redux";
import Navigation from './components/Navigation';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  )
}

export default App;
