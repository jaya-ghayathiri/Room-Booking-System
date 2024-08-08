const mongoose=require("mongoose");
const bookingSchema=new mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    roomId:{
         type: String, 
         ref: 'Room'
    },
    userId:{
        type:String,
        require:true
    },
    date:{
        type:String,
        require:true
    },
    startTime:{
        type:String,
        require:true
    },
    endTime:{
        type:String,
        require:true
    },
    isActive:{
        type:Boolean,
        default:true
    }

});
const Booking=new mongoose.model("Booking",bookingSchema);
module.exports=Booking;