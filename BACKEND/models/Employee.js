const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const employeeschema = new Schema({

    
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


    position :{

        type : String,
        required : true 

    },

})

const Employee = mongoose.model("Employee",employeeschema);

module.exports = Employee;
 
