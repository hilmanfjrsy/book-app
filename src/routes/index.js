import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './Router';
import { ToastContainer } from "react-toastify";
import BaseContext from '../context/BaseContext';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <BrowserRouter>
      <BaseContext>
        <Router />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover />
      </BaseContext>
    </BrowserRouter>
  )
}