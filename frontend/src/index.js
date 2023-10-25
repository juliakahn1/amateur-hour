import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import * as servicesActions from './store/services'
import * as jobsActions from './store/jobs'

let store = configureStore({});

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.servicesActions = servicesActions;
  window.jobsActions = jobsActions;
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
