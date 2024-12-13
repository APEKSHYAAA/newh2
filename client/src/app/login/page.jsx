import React from 'react';
import { useFormik } from 'formik';
import { loginUser } from '../../services/api.js';
import * as Yup from 'yup';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const data = await loginUser(values);
        alert(`Login successful! Welcome, ${data.usertype}`);
        // Redirect to another page
        window.location.href = '/main';
      } catch (error) {
        alert(error.message || 'Login failed');
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        {formik.errors.username && <p>{formik.errors.username}</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {formik.errors.password && <p>{formik.errors.password}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
