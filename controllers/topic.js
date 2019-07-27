import topics from "../schema/schemaTopic";
import sendMail from "../mailSender/chatInvitation";

var date = new Date();

export function createTopic(req, socket){
  console.log(1)
  var topic = {
    adminTopicId : req.userIdSender,
    topic        : req.topic,
    topicId      : req.topicId
  }
  topics.findOne({topicId : req.topicId}, (err, result) => {
    if (result === null) {
      new topics(topic).save().then(() => {
        topics.find({}, function (err, results) {
          socket.emit('topicsData', results);
        });
      })
    }
  });
}

export function deleteTopic(req, socket){
  topics.deleteOne({topicId : req.topicId}, (err, result) => {
    topics.find({}, function (err, results) {
      socket.emit('topicsData', results);
      socket.broadcast.emit('topicsData', results);
    });
  });
}

export function addFriendToTopic(req, socket){
  topics.updateOne({topicId : req.topicId},
    {
      $push : {
        inviteId : {
          id : req.userIdRecipient
        }
      }
    }, (err, result) => {
      topics.find({}, function (err, results) {
        socket.emit('topicsData', results);
        socket.broadcast.emit('topicsData', results);
        sendMail(req.email);
      });
    });
}

export function joinTopic(req, socket){
  console.log(req)
  topics.updateOne({topicId : req.topicId},
    {
      $pull : {
        inviteId : {
          id : req.userId
        }
      },
      $push : {
        confirmId : {
          id : req.userId
        }
      }
    }, (err, result) => {
      topics.find({}, function (err, results) {
        console.log('join', results)
        socket.emit('topicsData', results);
        socket.broadcast.emit('topicsData', results);
      });
    });
}

export function messageTopic(req, socket){
  topics.updateOne({topicId : req.topicId},
    {
      $push : {
        messages : {
          userId    : req.userId,
          messageId : req.messageId,
          message   : req.message 
        }
      }
    }, (err, result) => {
      topics.find({}, function (err, results) {
        console.log(results)
        socket.emit('topicsData', results);
        /* socket.broadcast.emit('topicsData', results); */
        socket.broadcast.to(req.topicId).emit('topicsData', results);
      });
    });
}

export function deleteMessageTopic(req, socket){
  topics.updateOne({topicId : req.topicId},
    {
      $pull : {
        messages : {
          messageId : req.messageId
        }
      }
    }, (err, result) => {
      topics.find({}, function (err, results) {
        console.log(results)
        socket.emit('topicsData', results);
       /*  socket.broadcast.emit('topicsData', results); */
        socket.to(req.topicId).emit('topicsData', results);
      });
    });
}

export function leaveTopic(req, socket){
  topics.updateOne({topicId : req.topicId},
    {
      $pull : {
        confirmId : {
          id : req.userId
        },
        inviteId : {
          id : req.userId
        }
      }
    }, (err, result) => {
      topics.find({}, function (err, results) {
        console.log(results)
        let test = results.filter(topic => req.topicId !== topic.topicId);
        socket.emit('topicsData', test);
        /* socket.broadcast.emit('topicsData', results); */
        socket.to(req.topicId).emit('topicsData', results);
        socket.leave(req.topicId)
      });
    });
}

export function connectTopic(req, socket){
  topics.find({}, function (err, results) {
    console.log(results)
    let test = results.filter(topic => req.topicId !== topic.topicId);
    socket.emit('topicsData', test);
  });
}
