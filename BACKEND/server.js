const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();
const dotenv = require("dotenv");


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  //useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //useFindAndModify: false
});

const connection = mongoose.connection
connection.once("open", () => {
  console.log('MongoDB Connection Success!!!')
})


const customerRouter = require("./routes/customers.js");
const userRouter = require("./routes/auth.js");
const HotelRouter = require("./routes/Hotels.js");
const { db } = require("./models/Hotel.js");
const EmployeeRouter = require("./routes/Employees.js");
const { route } = require("./routes/Employees.js");
const packageRouter = require("./routes/packages.js");
const PaymentRouter = require("./routes/Payments.js");
const TransportRouter = require("./routes/Transports.js");
const reserveRouter = require("./Routes/reserves.js");





app.use("/customer",customerRouter);
app.use("/users",userRouter);
app.use("/hotel", HotelRouter); //http://localhost:8070/hote
app.use("/Employee",EmployeeRouter);
app.use("/package",packageRouter);
app.use("/Payment",PaymentRouter);
app.use("/Transport",TransportRouter);
app.use("/reserve",reserveRouter);


app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`)
})

app.get("/hotel", (req, res) => {
  db.query("select * from hotels", (err, result) => {
      if(err){
          console.log(err);
      }else{
          res.send(result);
      }
  });
});
