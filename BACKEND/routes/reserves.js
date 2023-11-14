const router = require("express").Router();
const{ response } = require("express");
let reserve = require("../models/reserve");

http://localhost:8070/reserve/add

router.route("/add").post((req,res)=>{

    const HotelID =req.body.HotelID;
    const Roomtype = req.body.Roomtype;
    const AvailableRooms = Number(req.body.AvailableRooms);
    const Capacity = Number(req.body.Capacity);
    const Price = Number(req.body.Price);
    const Discount = Number(req.body.Discount);

    const newReseve =new reserve({

        HotelID,
        Roomtype,
        AvailableRooms,
        Capacity,
        Price,
        Discount
    })
    newReseve.save().then(()=>{
        res.json("New Reserve Added")
    }).catch((err)=>{
        console.log(err);
    })
})


http://localhost:8070/reserve
router.route("/").get((req,res)=>{

     reserve.find().then((reserves)=>{
        res.json(reserves)
    }).catch((err)=>{
        console.log(err)
    })   
})

http://localhost:8070/reserve/upadte

router.route("/update/:id").put(async(req, res) =>{
    let RoomID = req.params.id;
    const {HotelID,Roomtype,AvailableRooms,Capacity,Price,Discount} =req.body;

    const updatereservation ={
        HotelID,
        Roomtype,
        AvailableRooms,
        Capacity,
        Price,
        Discount
    }
    const upadte = await reserve.findByIdAndUpdate(RoomID,updatereservation).then(() =>{
        res.status(200).send({status:"Reserve update"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updatig data",error:err.message});
    })    
})
http://localhost:8070/reserve/delete
router.route("/delete/:id").delete(async (req, res) => {
    let RoomID = req.params.id;

    await reserve.findByIdAndDelete(RoomID)
    .then(() =>{
        res.status(200).send({status: "reserve delete"});
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete Room",error:err.message});
    })
})
router.route("/get/:id").get(async (req, res) =>{
    let RoomID = req.params.id;
    const user = await reserve.findById(RoomID)
    .then(() =>{
        res.status(200).send({status:"reserve fetched", Room: Room})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get Room", error: err.message});
    })
          
})
module.exports = router;

