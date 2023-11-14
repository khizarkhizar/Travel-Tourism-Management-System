const router = require("express").Router();
const { response } = require("express");
let Payment = require("../models/Payment");

http://Localhost:8070/Payment/add

router.route("/add").post((req,res)=>{


    const fristname = req.body.fristname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const nationality = req.body.nationality;
    const phone = Number(req.body.phone);
    const tnds = Number(req.body.tnds);
    const price = Number(req.body.price);
    const pname = req.body.pname;

    const newPayment = new Payment({

       fristname,
       lastname,
       email,
       nationality,
       phone,
       tnds,
       price,
       pname, 
       

    })

    newPayment.save().then(()=>{

        res.json("Payment Success Addes")
    }).catch((err)=>{

        console.log(err);
    })
})    


http://localhost:8070/Payment

router.route("/").get((req,res)=>{

    Payment.find().then((Payment)=>{
        res.json(Payment)

    }).catch((err)=>{

        console.log(err);
    })

})




http://localhost:8070/Payment/update/5ffffffhf

router.route("/update/:id").put(async (req,res) => {

    let userId = req.params.id;
    const {fristname, lastname,email, nationality, phone, tnds, price,pname} = req.body;

    const upadatepdetails = {

        fristname,
        lastname,
        email,
        nationality,
        phone,
        tnds,
        price,
        pname,
    }

    const update = await Payment.findByIdAndUpdate(userId, upadatepdetails).then(() =>{

        res.status(200).send({status: "user updated"})

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error with updating date", error:err.message})
    })


   })

   http://localhost:8070/delete/5ffffffhf

   router.route("/delete/:id").delete(async (req,res) => {

    let userId = req.params.id;

    await Payment.findByIdAndDelete(userId).then(() => {

        res.status(200).send({status: "user deleted"});

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "Error with Delete user", error:err.message})
    })

   })


   router.route("/get/:id").get(async (req,res) => {

    let userId = req.params.id;
    const user = await Payment.findById(userId).then( (Payment) =>{

        res.status(200).send({status: "user fetched", user : Payment})

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "Erroe with get user", error:err.message})
    })

})


router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    const user = await Payment.findById(userId).then(()=>{
        res.status(200).send({status:"User fetched", user:user});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message});
  })
})



module.exports = router;