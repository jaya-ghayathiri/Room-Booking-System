const express = require("express");
const Router = express.Router();
const roomController = require("../controller/roomController"); 

Router.get('/room', roomController.getAllRooms);
Router.post('/room', roomController.createRooms);
Router.put('/room/:id', roomController.updateRoom);
Router.delete('/room/:id', roomController.deleteRoom); 
module.exports = Router; 