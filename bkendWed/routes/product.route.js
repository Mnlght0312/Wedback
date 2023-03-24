const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");
router.get("/product", productController.getAll);
router.get("/product/:id", productController.getById);
router.post("/product", productController.create);
router.put("/product/:id", productController.updateById);
router.delete("/product/:id", productController.deleteById);

module.exports = router;
