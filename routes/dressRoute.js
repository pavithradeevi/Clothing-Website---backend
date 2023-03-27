const express = require("express")
const router = express.Router();
const Dress = require('../models/dressModel')

// create

router.post("/", async (req, res) => {
    const newProduct = new Dress(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

// update

router.put("/:id",  async (req, res) => {
    try {
      const updatedProduct = await Dress.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//DELETE
router.delete("/:id",  async (req, res) => {
    try {
      await Dress.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET PRODUCT
  router.get("/find/:id", async (req, res) => {
    try {
      const product = await Dress.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //GET ALL PRODUCTS
  router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Dress.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Dress.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Dress.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;