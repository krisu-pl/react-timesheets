import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './store'
import TimesheetsContainer from './containers/TimesheetsContainer'

export default () => (
  <Provider store={store}>
    <TimesheetsContainer />
  </Provider>
);
