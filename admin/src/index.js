import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import middleware from './middleware'
import persistReducers from './reducers'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { PopupProvider } from 'react-custom-popup'
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 10000,
  offset: '30px',
  class: 'alert',
  // you can also just use 'scale'
  transition: transitions.SCALE
}
let store = createStore(persistReducers, middleware)
let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AlertProvider template={AlertTemplate} {...options}>
        <PopupProvider>
          <App />
        </PopupProvider>
      </AlertProvider>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
)
