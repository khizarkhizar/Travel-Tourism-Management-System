const router = require("express").Router();
let Package = require("../models/Package");
const { response } = require("express");

//CREATE

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const description = req.body.description;
    const price = (req.body.price);

    const newPackage = new Package({

        name,
        description,
        price
    })

    newPackage.save().then(()=>{
        res.json("Package Added")
    }).catch((err)=>{
        console.log(err);
    })
})

//READ

//http://localhost:8070/package

router.route("/").get((req,res)=>{
     Package.find().then((packages)=>{
        res.json(packages)
    }).catch((err)=>{
        console.log(err)
    })
})

//UPDATE

router.route("/update/:id").put(async(req,res)=>{
    let packageId = req.params.id;
    const {name, description, price} = req.body;

    const updatePackage = {
        name,
        description,
        price
    }

    const update = await Package.findByIdAndUpdate(packageId,updatePackage)
    .then(()=>{
        res.status(200).send({status: "Package updated"})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

//DELETE

router.route("/delete/:id").delete(async(req,res)=>{
    let packageId = req.params.id;

    await Package.findByIdAndDelete(packageId)
    .then(()=>{
        res.status(200).send({status: "Package deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Error with get package",erorr: err.message});
    })
})

//ADDITIONAL READ
/*
router.route("/get/:id").get(async(req,res)=>{
    let packageId = req.params.id;
    await Package.findById(packageId)
    .then((package)=>{
        res.status(200).send({status: "Package fetched", package})
    }).catch(()=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get package", error: err.message});
    })
})*/


router.route('/get/:id').get(async(req,res)=>{
    let packageId = req.params.id;

    const user = await Package.findById(packageId).then((package)=>{
        res.status(200).send({status:"Package fetched", user:package});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with get package", error:err.message});
    })
})
    
module.exports = router;