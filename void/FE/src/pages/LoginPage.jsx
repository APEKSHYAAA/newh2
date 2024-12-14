import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, useToast } from '@chakra-ui/react';
import axios from 'axios';

function LoginPage({ error }) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if both email and password are provided
    if (formData.email && formData.password) {
      try {
        // Send POST request to the backend login API
        const response = await axios.post('http://localhost:5000/api/users/login', formData);

        // Handle successful login (show a success toast or redirect user)
        toast({
          title: 'Login successful',
          description: 'You have logged in successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        // Optionally, you can store user info or a token in localStorage or state
        console.log(response.data);
      } catch (error) {
        // Handle errors such as invalid credentials
        setIsError(true);
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Something went wrong.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      // If email or password is missing, show error
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
    <Box maxW="md" mx="auto" mt={12} p={8} bg="gray.800" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="email" color="white">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="gray.700" // Input background color
            color="white" // Text color
          />
        </FormControl>

        <FormControl isInvalid={isError} mb={6}>
          <FormLabel htmlFor="password" color="white">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="gray.700" // Input background color
            color="white" // Text color
          />
        </FormControl>

        {error && <Box color="red.500" mb={4}>{error}</Box>}

        <Button colorScheme="blue" width="full" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
}

export default LoginPage;