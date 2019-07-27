import mongoose   from "mongoose";
import app from './express';
import {friendRequest, updateFriend, recommendFriend, validRecommendFriend, deleteFriend} from './controllers/friend';
import { messageRequest, deleteMessage, responseRequest, deleteResponse } from './controllers/walls';
import { updateUser, isLogged, isLogout } from './controllers/users';
import jwt from 'jsonwebtoken';
require('dotenv').config();
const config = require('./config/config'); 

import { 
  createTopic, 
  deleteTopic, 
  addFriendToTopic, 
  joinTopic, 
  messageTopic, 
  deleteMessageTopic,
  leaveTopic ,
  connectTopic
} from './controllers/topic';

mongoose.set('useFindAndModify', false);

var http = require('http').createServer(app);
var io = require('socket.io')(http);

let usersConnected = [];
let usersData = {};
io.on('connection', function(socket){
  console.log(usersConnected)
  socket.emit('usersConnected', usersConnected);
  
  socket.on('identify', ({token}) => {
    console.log(token)
    try {
      let decode = jwt.verify(token, config.secret, {
        algorithms : ['HS256']
      });

      if(!usersConnected.includes(decode._id)){
        isLogged(decode._id, socket);
        usersConnected.push(decode._id);
        usersData = {...usersData, [socket.id] : {userId :decode._id}};
        socket.broadcast.emit('usersConnected', usersConnected);
        socket.emit('usersConnected', usersConnected);
        console.log(usersConnected);
        console.log(usersData)
      }
    }
    catch(err){
      console.log(err);
    }

    socket.on('friendRequest', data => {
      console.log('my emit ', data)
      friendRequest(data, socket);
    });
    socket.on('updateFriend', data => {
      console.log('updateFriend', data)
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
    socket.on('deleteFriend', data => {
      console.log('deleteFriend', data)
      deleteFriend(data, socket);
    });
    socket.on('messageRequest', data => {
      console.log('my emit ', data)
      messageRequest(data, socket);
    });
    socket.on('deleteMessageWall', data => {
      console.log('deleteMessageWall ', data)
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
    // Forum
    socket.on('createTopic', data => {
      console.log('my emit ', data)
      socket.join(data.topicId, ()=> {
        createTopic(data, socket);
      });
      console.log(socket.rooms)
    });
    socket.on('connectTopic', data => {
      console.log('connectTopic ', data)
      socket.join(data.topicId/* , ()=>{
        connectTopic(data, socket);
      } */);
    });
    socket.on('deleteTopic', data => {
      console.log('my emit ', data)
      deleteTopic(data, socket);
    });
    socket.on('leaveTopic', data => {
      console.log('my emit ', data)
      leaveTopic(data, socket);
    });
    socket.on('addFriendToTopic', data => {
      console.log('addFriendToTopic', data);
      addFriendToTopic(data, socket);
    });
    socket.on('room', function(room) {
      console.log(room)
      socket.join(room.topicId, ()=> {
        joinTopic(room, socket);
      });
      if(room.room){
        io.sockets.in(room.room).emit('message', 'hello from server');
      }
    });
    socket.on('messageTopic', data => {
      console.log('my emit ',data);
      console.log(socket.rooms);
      messageTopic(data, socket);
    });
    socket.on('deleteMessageTopic', data => {
      console.log('deleteMessageTopic ',data)
      deleteMessageTopic(data, socket); 
    });
    socket.on('updateUser', data => {
      console.log('updateUser', data);
      updateUser(data, socket);
    });
    socket.on('logout', id => {
      console.log('user disconnected');
      console.log(socket.id)
      console.log(usersData)
      if(usersData[socket.id]){
        isLogout(id, socket);
        usersConnected.splice(usersData[socket.id].userId);
        socket.broadcast.emit('usersConnected', usersConnected);
        delete usersData[socket.id];
        console.log(usersConnected);
        console.log(usersData)
      }
    });

  });

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('user disconnected ');
    console.log(socket.id)
    console.log(usersData)
    if(usersData[socket.id]){
      console.log('okkkkkkkkkkk')
      isLogout(usersData[socket.id].userId, socket);
      usersConnected.splice(usersData[socket.id].userId);
      delete usersData[socket.id];
      console.log(usersConnected);
      console.log(usersData)
    }
    socket.broadcast.emit('usersConnected', usersConnected);
  });
});

//Connexion à la base de donnée
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }).then(() => {
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

