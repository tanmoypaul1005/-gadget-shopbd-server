const { default: slugify } = require("slugify");
const Product = require("../Models/Product");
const ObjectId = require("mongodb").ObjectId;

//add product
module.exports.AddProduct = (req, res) => {
  const {
    name,
    price,
    slug,
    stock,
    category,
    brand,
    description,
    reviews,
    status,
    offer,
    image,
    quantity
  } = req.body;

  //  console.log(req.body)
  const price1 = parseInt(price);

  const offerPercentage = parseInt(offer)/ 100;
  const offerPrice = price1 - price1 * offerPercentage;
  console.log(offerPrice);
  Product.findOne({ name: name }).exec((error, data) => {
    if (data) {
      return res.status(404).json({ msg: "Product All Ready Register",success:false });
    }
    const _product = new Product({
      name,
      slug: slugify(name).toLowerCase(),
      stock,
      price,
      slug,
      category,
      brand,
      description,
      reviews,
      status,
      offer,
      image,
      offerPrice: offerPrice,
      reviews: [],
      quantity,
    });
    _product.save((error, data) => {
      if (error) {
        return res.status(400).json({ msg: "Somethings is Wrong", error,success:false });
      }
      if (data) {
        return res.status(200).json({ msg: "Product Create Successfully", data,success:true });
      }
    });
  });
};

//get Product
module.exports.getProductDetails = (req, res) => {

  Product.findOne({ _id: req.params.id })
    .populate("reviews.user")
    .populate("category")
    .exec((error, product) => {
      if (error) return res.status(400).json({ msg: "Somethings is Wrong",success:false });
      if (product) {
        const totalreviews = product.reviews.length;
        const data = {
          name: product.name,
          price: product.price,
          slug: product.slug,
          stock: product.stock,
          category: product.category,
          brand: product.brand,
          weight: product.weight,
          description: product.description,
          reviews: product.reviews,
          status: product.status,
          offer: product.offer,
          totalreviews,
        };
        return res.status(200).json({ data,success:true });
      }
    });
};

module.exports.GetProductAdmin = (req, res) => {
  Product.find({}).exec((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (data) {
      return res.status(200).json({ data });
    }
  });
};

module.exports.deleteProduct = (req, res) => {
  Product.findOneAndDelete({ _id: req.body.id }).exec((error, data) => {
    if (error) {
      return res.status(400).json({ error });
    }
    if (data) {
      return res.status(200).json({ msg: "Product is Delete" });
    }
  });
};

module.exports.ProductDetail = (req, res) => {
  Product.findOne({ _id: req.body.id })
    .populate("category")
    .exec((error, data) => {
      if (error) {
        return res.status(400).json({ error });
      }
      if (data) {
        return res.status(200).json({ data });
      }
    });
};

module.exports.editProduct= (req, res) => {
  const {
    name,
    price,
    slug,
    stock,
    category,
    brand,
    description,
    reviews,
    status,
    offer,
  } = req.body.data;
  console.log(req.body);

  const price1 = parseInt(price);
  const price2 = parseInt(offer);
  const offerpass = price2 / 100;
  const offerprice = price1 - price1 * offerpass;
  const updatedPost = {
    name: name,
    slug: slugify(name).toLowerCase(),
    price,
    slug,
    stock,
    category,
    brand,
    description,
    reviews,
    status,
    offerprice: offerprice,
    reviews: [],
  };

  Product.findOneAndUpdate({ id: req.body.id }, updatedPost).exec(
    (error, data) => {
      if (error) return res.status(500).json({ error });
      if (data) {
        return res
          .status(200)
          .json({ msg: "your Product is successfully Updated", data });
      }
    }
  );
};


module.exports.GetProductsFilterByCategory=(req,res)=>{
Product.find({category:req.params.category})
.exec((error, data) => {
  if (error) {
    return res.status(400).json({ error });
  }
  if (data) {
    return res.status(200).json({ data });
  }
});
}



