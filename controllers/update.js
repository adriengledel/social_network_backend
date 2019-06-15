import User from "../schema/schemaUser.js";
import friends from "../schema/schemaFriend.js";

function update(req, res) {
  User.find({}, function (err, user) {
    if (err) {
        res.status(500).json({
            "text": "Erreur interne"
        });
    } 
    else {
      User.find({}, function(err, docs){
          var users = {};
          docs.forEach(function (doc) {
              users[doc._id] = doc;
          });
          friends.find({}, function(err, docs){
            var friends = docs;
            res.status(200).json({
                "users" : users,
                "friends" : friends
            });
          });
      });
    }
  });
}

export default update;