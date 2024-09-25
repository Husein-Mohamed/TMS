import User from "../models/user.mjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configs/config.mjs";

export const getHome = (request, response) => {
  response.send("hello");
};

export const registerAdmin = async (request, response) => {
  try {
    const { firstName, lastName, email, password, role } = request.body;

    const userCount = await User.countDocuments();

    const assignedRole = userCount === 0 ? "Admin" : role || "User";

    const isUser = await User.findOne({ email: email.toLowerCase() });

    if (isUser) {
      return response.status(400).send("User already exists");
    }
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: assignedRole,
    });

    await user.save();
    user.password = undefined;

    response
      .status(201)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.log(`Error while registering user: ${error}`);
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return response.status(400).send(messages.join(" "));
    }
    // Default error message for other errors
    return response.status(400).send("An error occurred during registration.");
  }
};

export const loginUser = async (request, response) => {
  try {
    const { email, password } = request.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "+password"
    );
    if (!user) {
      return response.status(404).send("Invalid Email");
    }

    const isMatched = await user.comparePasswords(password);

    if (!isMatched) {
      return response.status(400).send("Invalid Password");
    }
    // token
    const expiresIn = 7 * 24 * 60 * 60;
    const token = jwt.sign({ _id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn,
    });

    response.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn * 1000,
    });

    user.password = undefined;

    response.status(200).send({ ...user.toJSON(), expiresIn });

    //
    //
  } catch (error) {
    console.log(`error while loggin in ${error}`);
    response.status(400).send(error.message);
  }
};
