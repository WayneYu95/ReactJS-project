import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { StoreContext } from 'redux-react-hook';
import App from './App';
import './index.less';
import reducers from './reducers';

const store = createStore(
  reducers,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>
  ,
  document.getElementById('root')
);
