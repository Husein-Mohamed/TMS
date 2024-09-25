import { Router } from "express";
import { loginUser, registerAdmin } from "../controller/userController.mjs";
import {
  validateUserRegistration,
  validateUserLogin,
} from "../middleware/userValidation.mjs";

import {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
  fetchUsers,
  verifyUserByEmail,
} from "../controller/adminController.mjs";

import { isAdmin } from "../middleware/isAdmin.mjs";

const router = Router();

// Create a new admin
router.post("/api/registerUser", validateUserRegistration, registerAdmin);

// Create a new user
router.post("/api/createUser", validateUserRegistration, isAdmin, createUser);

// Update an existing user
router.put("/api/updateUser", isAdmin, updateUser);

// get user by email
router.get("/api/users/verify/:email", isAdmin, verifyUserByEmail);

// Delete a user
router.delete("/api/deleteUser", isAdmin, deleteUser);

// Get all users
router.get("/api/users", isAdmin, getAllUsers);

// fetch users form the db
router.get("/api/fetchUsers", isAdmin, fetchUsers);

router.post("/api/loginUser", validateUserLogin, loginUser);

export default router;
