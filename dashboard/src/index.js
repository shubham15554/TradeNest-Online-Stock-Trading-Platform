import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CookiesProvider } from "react-cookie";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <CookiesProvider>
    <BrowserRouter>
     <ToastContainer />
      <Routes>
        <Route path="/*" element={<Home />} />
      </Routes>
   
    </BrowserRouter>
    </CookiesProvider>
  
);
