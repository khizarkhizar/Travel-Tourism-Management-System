const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reservationSchema = Schema({
//bookingId
//roomId
//boolean - bookingStatus
    HotelID : {
        type : String,
        required:true
    },
    Roomtype:{
        
        type:String,
        required: true
    },
    AvailableRooms:{

        type:Number,
        required: true
    },
    Capacity:{

        type:Number,
        required: true
    },
    Price:{

        type:Number,
        required: true
    },
    Discount:{

        type:Number,
        required: true
    }
})

const Reservation = mongoose.model("Resrvation", reservationSchema);

module.exports = Reservation;