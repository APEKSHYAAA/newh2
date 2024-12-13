import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {NextUIProvider} from '@nextui-org/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Login from './app/login/page.jsx'; // Ensure Login.jsx exists
import Register from './app/register/page.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
