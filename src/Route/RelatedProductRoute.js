const app = require("express");
const { AddRelatedProduct, GetRelatedProduct } = require("../Controller/RelatedProductController");
const router = app.Router();


//Add Related Product
router.post('/related-product/add',AddRelatedProduct);

//Get Related Product
router.get('/related-product/:id',GetRelatedProduct)
module.exports = router;