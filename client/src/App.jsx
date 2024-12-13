import React from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <>
      <h1>Welcome</h1>
      <button onClick={goToLogin}>Go to Login</button>
    </>
  );
}

export default App;
