  import mongoose from "mongoose";
  import bcrypt from "bcrypt";

  const userSchema = new mongoose.Schema(
    {
      firstName: {
        type: String,
        required: true,
        set: (value) =>
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        set: (value) =>
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User",
      },
    },

    {
      timestamps: true,
    }
  );

  userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }

    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.log(`Error while hashing the password: ${error}`);
    }
  });
  userSchema.methods.comparePasswords = async function (givenPassword) {
    return await bcrypt.compare(givenPassword, this.password);
  };

  const User = mongoose.model("User", userSchema);

  export default User;


 
