import friends from "../schema/schemaFriend.js";
import sendEmail from "../mailSender/friendRequestMail";


export function friendRequest(req, socket) {
  var friendSender = {
    id: req.userIdSender,
    userId: [{
      id: req.userIdRecipient,
      statusId: 2
    }]
  }

  var friendRecipient = {
    id: req.userIdRecipient,
    userId: [{
      id: req.userIdSender,
      statusId: 5
    }]
  }
  new Promise(function (resolve, reject) {
    friends.findOne({
      id: req.userIdSender
    }, (err, result) => {
      if (result === null) {
        new friends(friendSender).save();
      } else {
        friends.updateOne({
          id: req.userIdSender
        }, {
          $addToSet: {
            userId: {
              id: req.userIdRecipient,
              statusId: 2
            }
          }
        }, function (err, result) {

        });
      }
    });

    friends.findOne({
      id: req.userIdRecipient
    }, (err, result) => {
      if (result === null) {
        new friends(friendRecipient).save();
        resolve(true);
      } else {
        friends.updateOne({
          id: req.userIdRecipient
        }, {
          $addToSet: {
            userId: {
              id: req.userIdSender,
              statusId: 5
            }
          }
        }, function (err, result) {
          resolve(true);
        });
      }
    });

  }).then(function () {
    friends.find({}, function (err, result) {
      console.log('emit')
      socket.broadcast.emit('friendsData', result);
      socket.emit('friendsData', result);
      /* sendEmail(req.email); */
    });
  });


}


export function updateFriend(req, socket) {
  new Promise(function (resolve, reject) {
    friends.findOneAndUpdate({
        id: req.userIdSender,
        'userId.id': req.userIdRecipient
      }, {
        $set: {
          'userId.$.statusId': req.statusIdSender
        }
      },
      function (err, result) {

      });


    friends.findOneAndUpdate({
        id: req.userIdRecipient,
        'userId.id': req.userIdSender
      }, {
        $set: {
          'userId.$.statusId': req.statusIdRecipient
        }
      },
      function (err, result) {
        resolve(true);
      });
  }).then(function () {
    friends.find({}, function (err, result) {
      socket.broadcast.emit('friendsData', result);
      socket.emit('friendsData', result);
    });
  });

}

export function recommendFriend(req, socket) {
  new Promise(function (resolve, reject) {
    friends.findOneAndUpdate({
        id: req.userIdRecipient
      }, {
        $addToSet: {
          userId: {
            id: req.userIdRecommend,
            statusId: req.statusId,
            recommendBy: req.userIdSender
          }
        }
      },
      function (err, result) {
        console.log(result)
        resolve(true);
      });
  }).then(function () {
    friends.find({}, function (err, result) {
      socket.broadcast.emit('friendsData', result);
      socket.emit('friendsData', result);
    });
  });
}

  export function validRecommendFriend(req, socket) {
    new Promise(function (resolve, reject) {
      friends.findOneAndUpdate({
          id: req.userIdSender,
          'userId.id': req.userIdRecipient
        }, {
          $set: {
            'userId.$.statusId': req.statusIdSender
          }
        },
        function (err, result) {
          console.log(result)
        });

        friends.findOne({
          id: req.userIdRecipient
        }, (err, result) => {
          if (result === null) {
            new friends(friendRecipient).save();
            resolve(true);
          } else {
            friends.updateOne({
              id: req.userIdRecipient
            }, {
              $addToSet: {
                userId: {
                  id: req.userIdSender,
                  statusId: req.statusIdRecipient
                }
              }
            }, function (err, result) {
              resolve(true);
            });
          }
        });

    }).then(function () {
      friends.find({}, function (err, result) {
        socket.broadcast.emit('friendsData', result);
        socket.emit('friendsData', result);
      });
    });

  }