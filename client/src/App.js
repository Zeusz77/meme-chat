import './App.css';

import React from 'react';

import { AppRouter } from './components/Router';
import { Provider } from 'react-redux';

import { store } from './store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
