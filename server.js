const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dressRoute = require('./routes/dressRoute.js')
const userRoute = require('./routes/userRoute.js')
const Dress = require('./models/dressModel')
const ordersRoute = require('./routes/ordersRoute')
const router = express.Router();
dotenv.config();

const app = express();
app.use(
    cors({
      origin: "*",
    })
  );

  router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json())

app.use('/api/users',userRoute);
app.use('/api/dress',dressRoute)
app.use('/api/orders',ordersRoute)



app.get("/",(req,res)=>{
    res.send("Welcome to our Dress Shop ")
})

// async function fun1(req, res){
//   let response = await request.get('/getdress');
//   Dress.find({},(err,docs)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         res.send(docs)
//     }
// })
// }

app.get("/getdress",(req,res)=>{
    Dress.find({},(err,docs)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(docs)
        }
    })
})


const uri = process.env.MONGO_URL;
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port: ${port}...`);
  });
  
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected Successfully"))
    .catch((error) => console.error("MongoDB connection failed:", error.message));