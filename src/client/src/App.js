import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Provider } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';
import store from './store';


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Landing />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
