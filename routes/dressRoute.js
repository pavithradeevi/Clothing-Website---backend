
// const router = express.Router();
// const Dress = require('../models/dressModel')

// // create

// router.post("/adddress", async (req, res) => {
//     const newProduct = new Dress(req.body);
  
//     try {
//       const savedProduct = await newProduct.save();
//       res.status(200).json(savedProduct);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  

// // update

// router.put("/:id/editdress",  async (req, res) => {
//     try {
//       const updatedProduct = await Dress.findByIdAndUpdate(
//         req.params.id,
//         {
//           $set: req.body,
//         },
//         { new: true }
//       );
//       res.status(200).json(updatedProduct);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// //DELETE
// router.delete("/:id/deletedress",  async (req, res) => {
//     try {
//       await Dress.findByIdAndDelete(req.params.id);
//       res.status(200).json("Product has been deleted...");
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });
  
//   //GET PRODUCT
//   router.get("/find/:id", async (req, res) => {
//     try {
//       const product = await Dress.findById(req.params.id);
//       res.status(200).json(product);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

  
  
//   //GET ALL PRODUCTS
//   router.get("/getalldresses", async (req, res) => {
//     const qNew = req.query.new;
//     const qCategory = req.query.category;
//     try {
//       let products;
  
//       if (qNew) {
//         products = await Dress.find().sort({ createdAt: -1 }).limit(1);
//       } else if (qCategory) {
//         products = await Dress.find({
//           categories: {
//             $in: [qCategory],
//           },
//         });
//       } else {
//         products = await Dress.find();
//       }
  
//       res.status(200).json(products);
//     } catch (err) {
//       res.status(500).json(err);
//     }
//   });

// module.exports = router;


const express = require("express")
const router = express.Router();
const Dress = require('../models/dressModel')

router.get("/getalldresses", async(req, res) => {
  
    try {
        const dresses = await Dress.find({})
        res.send(dresses)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/adddress", async(req, res) => {

    const dress = req.body.dress

   try {
    const newdress = new Dress({

          title: dress.title,
          desc: dress.desc,
          img: dress.img,
          size: ["S","M","L","XL","XXL"],
          category: dress.category,
          price: dress.price,

        
    })
    await newdress.save()
    res.send('New Dress Added Successfully')
   } catch (error) {
       return res.status(400).json({ message: error });
   }
  
});

router.post("/getdressbyid", async(req, res) => {

 const dressid = req.body.dressid

 try {
     const dress = await Dress.findOne({_id : dressid})
     res.send(dress)
 } catch (error) {
     return res.status(400).json({ message: error });
 }
  
});

router.post("/editdress", async(req, res) => {

    const editeddress = req.body.editeddress

    try {
        const dress = await Dress.findOne({_id : editeddress._id})
        
        dress.title= editeddress.title,
        dress.desc= editeddress.desc,
        dress.img= editeddress.img,
        dress.category=editeddress.category,
        dress.price = [editeddress.price]

        await dress.save()

        res.send('dress Details Edited successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deletedress", async(req, res) => {

    const dressid = req.body.dressid

  try {
    await Dress.findOneAndDelete({_id : dressid})
    res.send('Dress Deleted successfully')
  } catch (error) {
      return res.status(400).json({ message: error });
  }
  
});


module.exports = router;