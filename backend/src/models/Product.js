const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    },

    category:{
        type:String,
        required:true
    },

    images:[
        {
            type:String
        }
    ],

    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    status:{
        type:String,
        enum:["draft","published","archived"],
        default:"draft"
    },

    isDeleted:{
        type:Boolean,
        default:false
    }

},
{timestamps:true}
)

module.exports = mongoose.model("Product",productSchema)