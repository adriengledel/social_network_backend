import mongoose   from "mongoose";
import app from './express';
import {friendRequest, updateFriend, recommendFriend, validRecommendFriend} from './controllers/friend';
import { messageRequest, deleteMessage, responseRequest, deleteResponse } from './controllers/walls';

mongoose.set('useFindAndModify', false);

var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('friendRequest', data => {
    console.log('my emit ', data)
    friendRequest(data, socket);
  });
  socket.on('updateFriend', data => {
    console.log('my emit ', data)
    updateFriend(data, socket);
  });
  socket.on('recommendFriend', data => {
    console.log('my emit ', data)
    recommendFriend(data, socket);
  });
  socket.on('validRecommendFriend', data => {
    console.log('my emit ', data)
    validRecommendFriend(data, socket);
  });
  socket.on('messageRequest', data => {
    console.log('my emit ', data)
    messageRequest(data, socket);
  });
  socket.on('deleteMessageWall', data => {
    console.log('my emit ', data)
    deleteMessage(data, socket);
  });
  socket.on('responseRequest', data => {
    console.log('my emit ', data)
    responseRequest(data, socket);
  });
  socket.on('deleteResponse', data => {
    console.log('my emit ', data)
    deleteResponse(data, socket);
  });
});

//Connexion à la base de donnée
mongoose.connect('mongodb://localhost/socialNetwork', { useNewUrlParser: true }).then(() => {
    console.log('Connected to mongoDB')
}).catch(e => {
    console.log('Error while DB connecting');
    console.log(e);
});

app.get('/hello',function(req,res){
    res.json("Hello World")
  });
//Définition et mise en place du port d'écoute
const port = 8000;
http.listen(port, () => console.log(`Listening on port ${port}`));

