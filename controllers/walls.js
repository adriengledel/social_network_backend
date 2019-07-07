import walls from "../schema/schemaWall";

var date = new Date();

export function messageRequest(req, socket) {
  var wall = {
    userId: req.userIdRecipient,
    messages: [{
      id : req.messageId,
      senderId: req.userIdSender,
      text: req.message,
      date: date
    }]
  }

  walls.findOne({
    userId: req.userIdRecipient
  }, (err, result) => {
    if (result === null) {
      console.log("1")
      new walls(wall).save().then(() => {
        walls.find({}, function (err, results) {
          var datas = {};
          console.log(results)
          results.forEach(function (result) {
            datas[result.userId] = result;
          });
          console.log('message', datas)
          console.log('emit')
          socket.broadcast.emit('wallsData', datas);
          socket.emit('wallsData', datas);
        });
      });
    } else {
      console.log("2")
      walls.updateOne({
        userId: req.userIdRecipient
      }, {
        $push: {
          messages: {
            id : req.messageId,
            senderId: req.userIdSender,
            text: req.message,
            date: date
          }
        }
      }, function (err, result) {
        walls.find({}, function (err, results) {
          var wall = {};
          results.forEach(function (result) {
            console.log(result)
            wall[result.userId] = result;
          });
          console.log('emit')
          socket.broadcast.emit('wallsData', wall);
          socket.emit('wallsData', wall);
        });
      });
    }
  });
}

export function deleteMessage(req, socket){
  walls.findOneAndUpdate({
    userId: req.userIdRecipient
  },{
    $pull: {
      messages : {
        id : req.messageId
      }
    }
  }).then(()=>{
    walls.find({}, function (err, results) {
      let wall = {};
      results.forEach(function (result) {
        console.log(result)
        wall[result.userId] = result;
      });
      console.log('emit')
      socket.broadcast.emit('wallsData', wall);
      socket.emit('wallsData', wall);
    });
  });
}

export function responseRequest(req, socket){
  walls.findOneAndUpdate({
    userId: req.userIdRecipient,
    'messages.id' : req.messageId
  },{
    $push: {
        'messages.$.responses' : {
          id       : req.subMessageId,
          senderId : req.userIdSender,
          text     : req.message,
          date     : date
      }
    }
  }).then(()=>{
    walls.find({}, function (err, results) {
      let wall = {};
      results.forEach(function (result) {
        console.log(result)
        wall[result.userId] = result;
      });
      console.log('emit')
      socket.broadcast.emit('wallsData', wall);
      socket.emit('wallsData', wall);
    });
  });
}

export function deleteResponse(req, socket){
  walls.findOneAndUpdate({
    userId: req.userIdRecipient,
    'messages.id' : req.messageId
  },{
      $pull: {
          'messages.$.responses' : {
              id : req.subMessageId
        }
    }
  }).then(()=>{
    walls.find({}, function (err, results) {
      let wall = {};
      results.forEach(function (result) {
        console.log(result)
        wall[result.userId] = result;
      });
      console.log('emit')
      socket.broadcast.emit('wallsData', wall);
      socket.emit('wallsData', wall);
    });
  });
}