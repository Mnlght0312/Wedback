const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      unique: true,
    },
    productPrice: Number,
    thumbImage: String,
    salePercent: Number,
    quantity: String,
    desc: String,
  },
  { collection: "Product" }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
