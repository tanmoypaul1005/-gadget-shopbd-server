
const app = require("express");
const { AddProduct,getProductDetails } = require("../Controller/ProductController");

const router = app.Router();

router.post('/product/add',AddProduct);
router.get('/productdetails/:id',getProductDetails);
// router.post('/product/admin/get',GetProductAdmin);
// router.post('/product/delete',DeleteProduct);
// router.post('/product/id',ProductDetail);
// router.post('/product/edit',ProductEdit);
// router.get('/product/filter/:category',GetProductsFilterByCategory)

module.exports = router;