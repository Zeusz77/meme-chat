import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Home } from './Home.js';
import { Login } from './Login';
import { Register } from './Register';
import { NotFound } from './NotFound';
import { Navbar } from './Navbar.js';
import { Footer } from './Footer.js';

export const AppRouter = () => {
    return (
        <Router>
            <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
            <Footer />
        </Router>
    );
};