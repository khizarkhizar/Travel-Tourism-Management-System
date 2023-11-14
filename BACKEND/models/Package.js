const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const packageSchema = new Schema({


    name : {
        type : String,
        required : true
    },
    description : {
        type : String
    },
    price : {
        type : String,
        required : true
    }

})

const Package = mongoose.model("Package",packageSchema);

module.exports = Package;