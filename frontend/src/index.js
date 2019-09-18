import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'babel-polyfill';

// import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fortawesome/fontawesome-free/css/all.css";
import {BrowserRouter} from 'react-router-dom'
import { Provider } from "react-redux";
import rootReducer from './rootReducer'
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';




const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
    && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
