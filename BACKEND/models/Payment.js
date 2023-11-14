const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const paymentschema = new Schema({

    
    fristname :{

        type : String,
        required : true 
    },

    lastname :{

        type : String,
        required : true 
    },

    email :{

        type : String,
        required : true 
    },

    nationality :{

        type : String,
        required : true 
    },
 
    phone :{

        type : Number,
        required : true
    },


    tnds :{

        type : Number,
        required : true 

    },

    price :{

        type : Number,
        required : true 

    },

    pname : {

        type : String,
        required : true
    }, 

})

const Payment = mongoose.model("Payment",paymentschema);

module.exports = Payment;
 
