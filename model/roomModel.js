const mongoose=require("mongoose");
const roomSchema=new mongoose.Schema({
    id:{
        type:String,
        require:[true,"Room id is mandatory"],
        unique: true
    },
    image:{
        type:String
    },
    name:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true
    },
    capacity:{
        type:Number,
        require:true
    }
});
const Room=mongoose.model("Rooms",roomSchema);
module.exports=Room;