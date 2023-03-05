
const app = require("express");
const { AddProduct , getProductDetails , deleteProduct , editProduct} = require("../Controller/ProductController");

const router = app.Router();

router.post('/product/add',AddProduct);
router.get('/product/:id',getProductDetails);
// router.post('/product/admin/get',GetProductAdmin);
router.post('/product/delete',deleteProduct);
// router.post('/product/id',ProductDetail);
router.post('/product/edit',editProduct);
// router.get('/product/filter/:category',GetProductsFilterByCategory)

module.exports = router;