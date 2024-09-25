import User from "../models/user.mjs";

// Create a new user
export const createUser = async (request, response) => {
  try {
    console.log(request.body);
    const newUser = new User(request.body);
    await newUser.save();
    response.status(201).json({
      message: "User created successfully",
      newUser,
    });
  } catch (error) {
    response.status(500).json({ message: "Error creating user", error });
  }
};

// Update an existing user
export const updateUser = async (request, response) => {
  const { currentEmail, newEmail, firstName, lastName, role, password } =
    request.body;

  console.log("Received update request for user:", {
    currentEmail,
    newEmail,
    firstName,
    lastName,
    role,
  });

  try {
    const user = await User.findOne({ email: currentEmail });
    if (!user) {
      console.log("User not found:", currentEmail);
      return response.status(404).json({ message: "User not found" });
    }

    if (newEmail && newEmail !== currentEmail) {
      const emailExists = await User.findOne({ email: newEmail });
      if (emailExists) {
        console.log("New email already in use:", newEmail);
        return response.status(400).json({ message: "Email already in use" });
      }
      user.email = newEmail;
      console.log("Email updated to:", newEmail);
    }

    if (firstName) {
      user.firstName = firstName;
      console.log("First name updated to:", firstName);
    }

    if (lastName) {
      user.lastName = lastName;
      console.log("Last name updated to:", lastName);
    }
    if (role) {
      user.role = role;
      console.log("Role updated to:", role);
    }

    // Update password if provided
    if (password) {
      user.password = password;
      console.log("Password updated.");
    }

    const updatedUser = await user.save();
    console.log("User successfully updated:", updatedUser);
    response
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    response.status(500).json({ error: "Error updating user" });
  }
};
// get user by email
export const verifyUserByEmail = async (request, response) => {
  try {
    const user = await User.findOne({ email: request.params.email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json({ user });
  } catch (error) {
    response.status(500).json({ error: "Error verifying user" });
  }
};

// Delete a user
export const deleteUser = async (request, response) => {
  try {
    const user = await User.findOneAndDelete({ email: request.body.email });
    if (!user) {
      return response.status(404).json({ message: "User not found" });
    }
    response.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    response.status(500).json({ error: "Error deleting user" });
  }
};

// Get all users
export const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ error: "Error fetching users" });
  }
};

export const fetchUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json({ message: "found Users", users });
  } catch (error) {
    response.status(500).json({ error: err.message });
  }
};
