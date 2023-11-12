const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],  
    },  
    email: {
      type: String,
      required: [true, "Please add your email"],
      unique: [true, "email id is already registered"],
    },
    phone: {
      type: String,
      required: [true, "add your phone number"],
      unique: [true, "PhoneNo. already registered"],
    },
    password: {
      type: String,
      required: [true, "add valid password"],
      unique: [true, "password already taken"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userSchema);
