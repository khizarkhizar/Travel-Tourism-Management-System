const router = require("express").Router();
const { response } = require("express");
//const route = express.Router()
//const multer = require("multer");
let Hotel = require("../models/Hotel");

//Add
//http://localhost:8070/hotel/add

router.route("/add").post((req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const contact = req.body.contact;
    const address = req.body.address;

    //CREATE

    const newHotel = new Hotel({
        name,
        email,
        contact,
        address
    })

    newHotel.save().then(() => {
        res.json("Added to Hotels")
    }).catch((err) => {
        console.log(err);
    })

})

//READ

router.route("/").get((req, res) => {
    Hotel.find().then((fHotels) => {
        res.json(fHotels)
    }).catch((err) => {
        console.log(err)
    })

})

//Update
//http://localhost:8070/hotel/update/ randomID

router.route("/update/:id").put(async(req, res) => {
    let userId = req.params.id;
    const { name, email, contact, address } = req.body;

    const updateHotel = {
        name,
        email,
        address,
        contact
    }

    const update = await Hotel.findByIdAndUpdate(userId, updateHotel).then(() => {
        res.status(200).send({ status: "User updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with updating data" });
    })

})

//Delete
//http://localhost:8070/hotel/delete/ randomID

router.route("/delete/:id").delete(async(req, res) => {
    let userId = req.params.id;

    await Hotel.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted" })
    }).catch((err) => {
        console.log(err)
        res.status(500).send({ status: "User deletion error", error: err.message })
    })
})

//Get only one hotel detail

router.route("/get/:id").get(async(req, res) => {
    let userId = req.params.id;
    const user = await Hotel.findById(userId).then((hotel) => {
        res.status(200).send({ status: "User Fetched", hotel })
    }).catch((err) => {
        res.status(500).send({ status: "Error with get user", error: err.message })
    })
})

module.exports = router;