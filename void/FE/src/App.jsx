import React, { useState } from 'react';
import { Box } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import { useColorModeValue } from '@chakra-ui/react';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import RegisterPage from './pages/RegisterPage'; // Import RegisterPage
import ProductDetailPage from './pages/productDetails';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // User state
  const [authError, setAuthError] = useState(null); // Error state

  const handleAuthSubmit = async (data) => {
    try {
      const response = await fetch(`http://localhost:8000/${currentUser ? 'login' : 'register'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.error) {
        setAuthError(result.error);
        return;
      }

      setCurrentUser({ username: data.email, usertype: result.usertype });
      setAuthError(null);
    } catch (err) {
      setAuthError('Failed to connect to server');
    }
  };

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.200', 'gray.900')}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route
          path="/login"
          element={<LoginPage onSubmit={handleAuthSubmit} error={authError} />}
        />
        <Route
          path="/register"
          element={<RegisterPage onSubmit={handleAuthSubmit} error={authError} />}
        />
      </Routes>
    </Box>
  );
}

export default App;
