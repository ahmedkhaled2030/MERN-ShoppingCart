const { Router } = require("express");
const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        //take everything inside request and body and set it again
        $set: req.body,
      },
      // if you do that it's not gonna return you this updated user to prevent this you should write here new
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  console.log(req.query);
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL IDENTICALS

router.get("/Identicals", async (req, res) => {
  const qCategory = req.query.category;
  try {
    console.log(req.query);
    const IdenticalProducts = await Product.find({
      categories: {
        $in: [qCategory],
      },
    });
    res.status(200).json(IdenticalProducts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/search", async (req, res) => {
  console.log(req.query);
  const { q } = req.query;

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(q))
  //   );
  // };

  // q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));

  try {
    if (q !== '') {
      const searchedItem = await Product.find({
        $or: [
          { desc: { $regex: q} ,"$options": "i" },
          { title: { $regex: q }, "$options": "i" },
      
          
        ],
      });
      // const searchedItem = await Product.find();
      res.status(200).json(searchedItem.slice(0, 10));
    } 
  } catch (err) {
    res.status(500).json("err");
  }
});

module.exports = router;
