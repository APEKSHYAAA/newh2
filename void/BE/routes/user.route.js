// import express from 'express';
// import { registerNewUser, loginUser, getAllUsers, getUserDetailsById } from '../controller/user.controller.js';

// const router = express.Router();


// router.post('/users/register', registerNewUser); // Ensure this matches the endpoint in your front-end
// router.post('/api/users/register', registerNewUser); // Ensure this matches the endpoint in your front-end
// router.post('/register', registerNewUser);
// router.post('/login', loginUser);
// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserDetailsById);

// export default router; // Use export default instead of module.exports

import express from 'express';
import {
  registerNewUser,
  loginUser,
  getAllUsers,
  getUserDetailsById
} from '../controller/user.controller.js';

const router = express.Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetailsById);

export default router;