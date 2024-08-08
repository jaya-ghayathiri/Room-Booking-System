const Room=require("../model/roomModel");
const { v4: uuidv4 } = require('uuid');
const createRooms=async(req,res)=>{
    try{
        const {name,location,capacity}=req.body;
        const newRoom=new Room({id:uuidv4(),name,location,capacity});
        await newRoom.save();
        res.status(201).json(newRoom);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
};
const getAllRooms=async(req,res)=>{
    try{
        const Rooms=await Room.find();
        res.status(201).send(Rooms)
    }
    catch(error){
        res.status(401).json({error:error.message})
    }
};

const updateRoom=async(req,res)=>{
    try{
        const {id}=req.params;
        const {name,location,capacity}=req.body;
        const updatedRoom=await Room.findOneAndUpdate({id},{name,location,capacity},{new:true});
        if(!updatedRoom){
            res.status(404).send("Room not found");
        }
        res.json(updatedRoom);
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
};

const deleteRoom=async(req,res)=>{
    try{
        const {id}=req.params;
        const{name,location,capacity}=req.body;
        const deletedRoom=await Room.findOneAndDelete({id});
        if(!deletedRoom){
            res.status(404).send("Room not found");
        }
        res.status(204).send();

    }
    catch(error){
        res.status(400).json({error:error.message})
    }
};


module.exports={createRooms,getAllRooms,updateRoom,deleteRoom}
