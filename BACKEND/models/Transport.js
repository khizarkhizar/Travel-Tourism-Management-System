const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Transportschema = new Schema({

    
    vreg :{

        type : String,
        required : true 
    },

    vname :{

        type : String,
        required : true 
    },

    vowner :{

        type : String,
        required : true 
    },

    vprice :{

        type : String,
        required : true 
    },
 
    vdescription :{

        type : String,
        required : true
    },


})

const Transport = mongoose.model("Transport",Transportschema);

module.exports = Transport;