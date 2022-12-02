import './App.css';

import React from 'react';

import { AppRouter } from './components/Router';
import { Provider } from 'react-redux';

function App() {
  return (
    <div className="App">
      <Provider>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
