import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, useToast } from '@chakra-ui/react';

function LoginPage({ onSubmit, error }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    
  });

  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      onSubmit(formData);
    } else {
      setIsError(true);
      toast({
        title: 'Error',
        description: 'Please fill in both email and password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={8} bg="grey.1000" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="email" color="white.100">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white.700" // Input background color
            color="black" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={6}>
          <FormLabel htmlFor="password" color="white.100">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
             // Lighter color for placeholder
            bg="white.700" // Input background color
            color="black" // Text color
          />
        </FormControl>

        {error && <Box color="red.500" mb={4}>{error}</Box>}

        <Button colorScheme="blue" width="full" type="submit">
          Login
        </Button>
      </form>
      <Box textAlign="center" mt={4} color="blue.200" cursor="pointer" onClick={() => window.location.href='/register'}>
        Register Instead
      </Box>
    </Box>
  );
}

export default LoginPage;
