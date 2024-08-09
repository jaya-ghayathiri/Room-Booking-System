
const express=require('express');
const app=express();
const cron=require("node-cron")
const bodyParser = require('body-parser');
const cors=require('cors')
const port=3000;
const {expireOldBookings}=require("./controller/bookingContoller")
const Roomroutes=require("./routes/roomRoute");
const Bookingroutes=require('./routes/bookingRoute')
const Userroutes=require('./routes/userroutes')
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://jayaghayathiri:jayagayu@cluster0.jhjnpn6.mongodb.net/RoomBooking_System?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("Mongodb connected");
})

app.use(bodyParser.json());
app.use(cors());
app.use('/',Roomroutes);
app.use('/',Bookingroutes);
app.use('/',Userroutes)
app.set("view engine","ejs");
cron.schedule('* * * * *', expireOldBookings);
app.listen(port,()=>{
    console.log(`Server is running on the port ${port}`);
})