import './App.css';

import React from 'react';

import { AppRouter } from './components/Router';
import { Provider } from 'react-redux';

import { store } from './store';

function App() {

  // On reload check if there is a token in local storage 
  // and if there is, set the user to the user in local storage
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      store.dispatch({ type: 'SET_USER', payload: JSON.parse(localStorage.getItem('user')) });
    }
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;
