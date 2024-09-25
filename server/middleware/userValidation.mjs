import { check, validationResult } from "express-validator";

export const validateUserRegistration = [
  check("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long"),

  check("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword()
    .withMessage("Password must be strong"),

  check("role").optional().isIn(["Admin", "User"]).withMessage("Invalid role"),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const uniqueErrors = {};
      errors.array().forEach((err) => {
        if (!uniqueErrors[err.param]) {
          uniqueErrors[err.param] = err.msg;
        }
      });
      return response.status(400).json(Object.values(uniqueErrors));
    }
    next();
  },
];

export const validateUserLogin = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  check("password").trim().notEmpty().withMessage("Password is required"),

  (request, response, next) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      const uniqueErrors = {};
      errors.array().forEach((err) => {
        if (!uniqueErrors[err.param]) {
          uniqueErrors[err.param] = err.msg;
        }
      });
      return response.status(400).json(Object.values(uniqueErrors));
    }
    next();
  },
];
