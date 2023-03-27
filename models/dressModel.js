const mongoose = require("mongoose")

const dressSchema = mongoose.Schema({

    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    size: { type: Array },
    category: { type: String },
    price: { type: Number, required: true },

   

} , {
    timestamps:true,
});

const dressModel = mongoose.model('dresses' , dressSchema)

module.exports = dressModel