import { response } from "express";
import { check, validationResult } from "express-validator";

export const validateClient = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("The name is required")
    .isLength({ min: 3 })
    .withMessage("The name must be at least 3 characters long"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email"),

  check("address").trim().notEmpty().withMessage("The address is required"),

  check("phoneNumberOne")
    .trim()
    .notEmpty()
    .withMessage("is required")
    .isNumeric()
    .withMessage("Must be a number"),

  check("phoneNumberTwo")
    .trim()
    .notEmpty()
    .withMessage("is required")
    .isNumeric()
    .withMessage("Must be a number"),
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
