const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema } = mongoose;
const productSchema = Schema({
  name: {
    type: String,
    unique: true,
    required: [true, "A product must have a name"],
    trim: true,
    maxlength: [
      40,
      "A product name must have less or equal then 40 characters",
    ],
    minlength: [5, "A product name must have less or equal then 5 characters"],
  },
  description: {
    type: String,
    required: [true, "A product must have a name"],
    trim: true,
    maxlength: [
      200,
      "A product name must have less or equal then 200 characters",
    ],
    minlength: [5, "A product name must have less or equal then 5 characters"],
  },

  price: {
    type: Number,
    min: [0, "wrong price"],
    required: [true, "A product must have a price"],
  },
});
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
exports.Product = mongoose.model("Product", productSchema);
