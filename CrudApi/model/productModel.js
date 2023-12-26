const mongoose = require('mongoose')

//mongoose.schema takes the object of element...

const productSchema = mongoose.Schema({
    taskName:{
        type:String,
        required:[true, "please enter the product name"]
    },
    description:{
        type:String,
        required:[true, "please enter the description"]
    },
    completed:{
            type:Boolean,
            required:[true, "by default it is false"],
            default:false
    }
},{
    timestamps:true
}
)

// mongoose.model excepts 2 field Model name and the schema...
const Product = mongoose.model('Product', productSchema)

module.exports = Product