const express = require("express");
const Router = express.Router();
const roomController = require("../controller/roomController"); 

Router.get('/getroom', roomController.getAllRooms);
Router.post('/addroom', roomController.createRooms);
Router.put('/room/:id', roomController.updateRoom);
Router.delete('/room/:id', roomController.deleteRoom); 
module.exports = Router; 