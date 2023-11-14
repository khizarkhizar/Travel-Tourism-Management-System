const router = require("express").Router();
const { response } = require("express");
let customer = require("../models/customer");

//add customers
router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const passport = req.body.passport;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const mobile = Number(req.body.mobile);
    const email = req.body.email;

    const newCustomer = new customer({

        name,
        passport,
        age,
        gender,
        mobile,
        email

    })



    newCustomer.save().then(()=>{
        res.json("Customer added")
    }).catch((err)=>{
        console.log(err);
    })
})



//get customer details
router.route("/").get((req,res)=>{

    customer.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        console.log(err);
    })
})



//update customer details
router.route("/update/:id").put(async(req,res)=>{
    let userId = req.params.id;
    const {name, passport, age, gender, mobile, email} = req.body;

    const updateCustomer = {
        name,
        passport,
        age,
        gender,
        mobile,
        email
    }

    const update = await customer.findByIdAndUpdate(userId, updateCustomer).then(()=>{

        res.status(200).send({status:"User updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data",error: err.message});
    })
    
})


//delete customer details
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await customer.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message});
    })
})


router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    const user = await customer.findById(userId).then((customer)=>{
        res.status(200).send({status:"User fetched", user:customer});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message});
    })
})


module.exports = router;