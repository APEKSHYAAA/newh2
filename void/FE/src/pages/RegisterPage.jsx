import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, useToast } from '@chakra-ui/react';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: '',
  });

  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const toast = useToast();

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission for user registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (formData.fullName && formData.email && formData.password && formData.userType) {
      try {
        // Send POST request to the backend for user registration
        const response = await axios.post('http://localhost:5000/api/users', formData);

        // On success, show a success toast
        toast({
          title: 'Registration successful',
          description: 'Your account has been created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        window.location.href = "/login";
        // Optionally, you can redirect the user to the login page or home page
      } catch (error) {
        // Handle errors (e.g., validation failure, server issues)
        setIsError(true);
        setErrorMessages(error.response?.data?.errors || {});
        toast({
          title: 'Error',
          description: error.response?.data?.message || 'Something went wrong.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      // If any required field is missing, show error messages
      setIsError(true);
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
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
          <FormLabel htmlFor="fullName" color="white">Full Name</FormLabel>
          <Input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            _placeholder={{ color: 'gray.400' }}
            bg="gray.700"
            color="white"
          />
          <FormErrorMessage>{errorMessages.fullName}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="email" color="white">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.400' }}
            bg="gray.700"
            color="white"
          />
          <FormErrorMessage>{errorMessages.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={isError} mb={4}>
          <FormLabel htmlFor="password" color="white">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            _placeholder={{ color: 'gray.400' }}
            bg="gray.700"
            color="white"
          />
          <FormErrorMessage>{errorMessages.password}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={isError} mb={6}>
          <FormLabel htmlFor="userType" color="white">User Type</FormLabel>
          <Input
            id="userType"
            name="userType"
            type="text"
            value={formData.userType}
            onChange={handleInputChange}
            placeholder="Either owner or investor"
            _placeholder={{ color: 'gray.400' }}
            bg="gray.700"
            color="white"
          />
          <FormErrorMessage>{errorMessages.userType}</FormErrorMessage>
        </FormControl>

        <Button colorScheme="blue" width="full" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterPage;
