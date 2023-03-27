const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dressRoute = require('./routes/dressRoute.js')
const userRoute = require('./routes/userRoute.js')
const Dress = require('./models/dressModel')
const ordersRoute = require('./routes/ordersRoute')

dotenv.config();

const app = express();
app.use(
    cors({
      origin: "*",
    })
  );

app.use(express.json())

app.use('/api/users',userRoute);
app.use('/api/dresses',dressRoute)
app.use('/api/orsers',ordersRoute)



app.get("/",(req,res)=>{
    res.send("Welcome to our Shop")
})

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