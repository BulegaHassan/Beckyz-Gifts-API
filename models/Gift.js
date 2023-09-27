const mongoose = require("mongoose");

const GiftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must provide name"],
    trim: true,
    maxLength: [25, "name cannot exceed 25 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Please provide product description"],
    maxlength: [1000, "Description can not be more than 1000 characters"],
  },
  image: {
    type: String,
    default: "/uploads/example.jpg",
    required: [true, "Please provide image Link"],
  },
  category: {
    type: String,
    required: [true, "Please provide gift category"],
    enum: ["flowers", "ceramics", "jewellery"],
  },
  inStock: {
    type: Boolean,
    default: false,
  },
  colors: {
    type: [String],
    default: ["pink"],
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
});

GiftSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Gift", GiftSchema);
