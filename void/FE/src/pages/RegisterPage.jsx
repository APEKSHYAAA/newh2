import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router's useNavigate hook
import { Box, Button, FormControl, FormLabel, Input, FormErrorMessage, Select, useToast } from '@chakra-ui/react';

function RegisterPage() {
  const navigate = useNavigate(); // React Router's useNavigate hook
  const toast = useToast();

  const [formValues, setFormValues] = useState({
    fullName: '',
    email: '',
    password: '',
    userType: 'investor', // Default user type
  });

  const [errors, setErrors] = useState({}); // Track form errors

  // Form validation function
  const validate = (values) => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = 'Full name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (values.email.length < 2) {
      errors.email = 'Email is too short';
    } else if (values.email.length > 50) {
      errors.email = 'Email is too long';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    if (!values.userType) {
      errors.userType = 'User type is required';
    }
    return errors;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formValues);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const res = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });
        const data = await res.json();
        if (res.status === 200) {
          toast({
            title: 'Registration successful!',
            description: 'You have successfully registered.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          navigate('/login'); // Redirect to login page after successful registration
        } else {
          toast({
            title: 'Error',
            description: data.msg || 'An error occurred during registration.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (err) {
        console.error('Error during registration:', err);
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again later.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={12} p={8} bg="grey.100" borderRadius="lg" boxShadow="lg">
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.fullName} mb={4}>
          <FormLabel htmlFor="fullName" color="black">Full Name</FormLabel>
          <Input
            id="fullName"
            name="fullName"
            value={formValues.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white" // Input background color
            color="black" // Text color
          />
          {errors.fullName && <FormErrorMessage>{errors.fullName}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.email} mb={4}>
          <FormLabel htmlFor="email" color="black">Email</FormLabel>
          <Input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="Enter your email"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white" // Input background color
            color="black" // Text color
          />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.password} mb={4}>
          <FormLabel htmlFor="password" color="black">Password</FormLabel>
          <Input
            id="password"
            name="password"
            type="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            _placeholder={{ color: 'gray.400' }} // Lighter color for placeholder
            bg="white" // Input background color
            color="black" // Text color
          />
          {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={errors.userType} mb={6}>
          <FormLabel htmlFor="userType" color="black">User Type</FormLabel>
          <Select
            id="userType"
            name="userType"
            value={formValues.userType}
            onChange={handleChange}
            placeholder="Select your role"
            bg="white" // Input background color
            color="black" // Text color
          >
            <option value="investor">Investor</option>
            <option value="business owner">Business Owner</option>
          </Select>
          {errors.userType && <FormErrorMessage>{errors.userType}</FormErrorMessage>}
        </FormControl>

        <Button colorScheme="blue" width="full" type="submit">
          Register
        </Button>
      </form>
    </Box>
  );
}

export default RegisterPage;
