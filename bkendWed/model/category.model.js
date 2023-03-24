const { default: mongoose } = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    CategoryName: String,
  },
  {
    collection: "Category",
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
