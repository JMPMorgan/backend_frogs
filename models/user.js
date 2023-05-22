const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  item_equipped: {
    type: String,
  },
  items: {
    type: String,
    required: [true, "Items is required"],
    default: " ",
  },
  createdAt: {
    type: Date,
    require: [true, "createdAt is required"],
    default: Date.now(),
  },
  coins: {
    type: Number,
    require: [true, "Coins is required"],
    default: 100,
  },
});

module.exports = model("User", UserSchema);
