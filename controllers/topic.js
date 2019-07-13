import topics from "../schema/schemaTopic";

var date = new Date();

export function createTopic(req, socket){
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
      });
    });
}

