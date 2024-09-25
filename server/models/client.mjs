import mongoose from "mongoose";

const clientSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase(),
    },
    phoneNumberOne: {
      type: Number,
      require: true,
      trim: true,
    },
    phoneNumberTwo: {
      type: Number,
      require: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
