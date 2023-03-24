const Product = require("../models/product.model");

// Get all products
exports.getAll = (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Create a new product
exports.create = (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
  });

  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Product created successfully",
        createdProduct: {
          name: result.name,
          description: result.description,
          price: result.price,
          category: result.category,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/api/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Get a single product
exports.getOne = (req, res) => {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }
      res.status(200).json(product);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Update a product
exports.update = (req, res) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const key of Object.keys(req.body)) {
    updateOps[key] = req.body[key];
  }
  Product.findByIdAndUpdate(id, { $set: updateOps })
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/api/products/" + id,
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};

// Delete a product
exports.delete = (req, res) => {
  const id = req.params.productId;
  Product.findByIdAndDelete(id)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/api/products",
          body: {
            name: "String",
            description: "String",
            price: "Number",
            category: "String",
          },
        },
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    });
};
