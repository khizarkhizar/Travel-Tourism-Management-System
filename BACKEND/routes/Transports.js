const router = require("express").Router();
const { response } = require("express");
let Transport = require("../models/Transport");

http://Localhost:8070/Transport/add

router.route("/add").post((req,res)=>{


    const vreg = req.body.vreg;
    const vname = req.body.vname;
    const vowner = req.body.vowner;
    const vprice = req.body.vprice;
    const vdescription = req.body.vdescription;

    const newTransport = new Transport({

   vreg,
   vname,
   vowner,
   vprice,
   vdescription,
       

    })

    newTransport.save().then(()=>{

        res.json("Transport Success Addes")
    }).catch((err)=>{

        console.log(err);
    })
})    


http://localhost:8070/Transport

router.route("/").get((req,res)=>{

    Transport.find().then((Transport)=>{
        res.json(Transport)

    }).catch((err)=>{

        console.log(err);
    })

})




http://localhost:8070/Transport/update/5ffffffhf

router.route("/update/:id").put(async (req,res) => {

    let userId = req.params.id;
    const {vreg,vname,vowner,vprice,vdescription,
            
     } = req.body;

    const upadatepdetails = {

        vreg,
        vname,
        vowner,
        vprice,
        vdescription,
            
     
    }

    const update = await Transport.findByIdAndUpdate(userId, upadatepdetails).then(() =>{

        res.status(200).send({status: "user updated"})

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error with updating date", error:err.message})
    })


   })

   http://localhost:8070/delete/5ffffffhf

   router.route("/delete/:id").delete(async (req,res) => {

    let userId = req.params.id;

    await Transport.findByIdAndDelete(userId).then(() => {

        res.status(200).send({status: "user deleted"});

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "Error with Delete user", error:err.message})
    })

   })



router.route("/get/:id").get(async (req,res) => {

    let userId = req.params.id;
    const user = await Transport.findById(userId).then( (transport) =>{

        res.status(200).send({status: "user fetched", user : transport})

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "Error with get user", error:err.message})
    })

})






module.exports = router;