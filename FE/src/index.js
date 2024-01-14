// Index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './screen/Home/Home';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ShowProduct from './screen/Admin/ShowProduct';
import Login from './screen/Login/Login'; 
import SignUp from './screen/SignUp/SignUp';
import AdminOrderPage from './screen/Admin/AdminOrderPage';
import ShowCart from './screen/Admin/ShowCart';
import Testcom from './screen/Admin/Testcom';
const Index = () => {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={ <Home />} />
                <Route path="/admin" element={<ShowProduct /> } />
                <Route path="/admin/order" component={<AdminOrderPage />} />
                <Route path="/showcart" element={<ShowCart /> } />
                <Route path="/test" element={<Testcom /> } />

                <Route path="/login" element={<Login />} />
                <Route path="/addsp" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

reportWebVitals();
