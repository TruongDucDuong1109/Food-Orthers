// Index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './screen/Home/Home';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShowProduct from './screen/Admin/ShowProduct';
import Login from './screen/Login/Login'; 
import SignUp from './screen/SignUp/SignUp';
import AdminOrderPage from './screen/Admin/AdminOrderPage';
import ShowCart from './screen/Admin/ShowCart';
import AddProduct from './screen/Admin/Addproduct/';
import SortToDate from './screen/Admin/SortToDate';
const Index = () => {
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/home" element={ <Home />} />
                <Route path="/admin" element={<ShowProduct /> } />
                <Route path="/admin/order" component={<AdminOrderPage />} />
                <Route path="/showcart" element={<ShowCart /> } />


                <Route path="/login" element={<Login />} />
                <Route path ="/sign" element={<SignUp />} />

                <Route path="/sort" element={<SortToDate />} />
                <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

reportWebVitals();
