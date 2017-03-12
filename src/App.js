import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
import TimesheetsContainer from './containers/TimesheetsContainer'

import './css/App.css'

export default () => (
  <Provider store={store}>
    <div className="App">
      <TimesheetsContainer />
    </div>
  </Provider>
)
