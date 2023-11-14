const router = require("express").Router();
const { response } = require("express");
let Employee = require("../models/Employee");

http://Localhost:8070/Employee/add

router.route("/add").post((req,res)=>{


    const fristname = req.body.fristname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const nationality = req.body.nationality;
    const phone = Number(req.body.phone);
    const position = req.body.position;

    const newEmployee = new Employee({

       fristname,
       lastname,
       email,
       nationality,
       phone,
       position,
       

    })

    newEmployee.save().then(()=>{

        res.json("Employee Successfully added")
    }).catch((err)=>{

        console.log(err);
    })
})    


http://localhost:8070/Employee

router.route("/").get((req,res)=>{

    Employee.find().then((Employee)=>{
        res.json(Employee)

    }).catch((err)=>{

        console.log(err);
    })

})




http://localhost:8070/Employee/update/5ffffffhf

router.route("/update/:id").put(async (req,res) => {

    let userId = req.params.id;
    const {fristname, lastname,email, nationality, phone, position} = req.body;

    const updateepdetails = {

        fristname,
        lastname,
        email,
        nationality,
        phone,
        position,
    }

    const update = await Employee.findByIdAndUpdate(userId, updateepdetails).then(() =>{

        res.status(200).send({status: "user updated"})

    }).catch((err)=>{

        console.log(err);
        res.status(500).send({status: "Error with updating date", error:err.message})
    })


   })

   http://localhost:8070/delete/5ffffffhf

   router.route("/delete/:id").delete(async (req,res) => {

    let userId = req.params.id;

    await Employee.findByIdAndDelete(userId).then(() => {

        res.status(200).send({status: "user deleted"});

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "Error with Delete user", error:err.message})
    })

   })


   router.route("/get/:id").get(async (req,res) => {

    let userId = req.params.id;
    const user = await Employee.findById(userId).then( (Employee) =>{

        res.status(200).send({status: "user fetched", user : Employee})

    }).catch((err)=>{

        console.log(err.message);
        res.status(500).send({status: "Erroe with get user", error:err.message})
    })

})


router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    const user = await Employee.findById(userId).then(()=>{
        res.status(200).send({status:"User fetched", user:user});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user", error:err.message});
  })
})



module.exports = router;