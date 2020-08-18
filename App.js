import React, { Component } from 'react';
import { View } from 'react-native';
import { SampleProvider } from './src/context'
import AppTabs from './src'

class App extends Component {
  render() {
    return (
        <SampleProvider>
          <AppTabs/>
        </SampleProvider>
    )
  }
}

export default App;