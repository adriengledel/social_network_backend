import User from "../schema/schemaUser.js";

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
        res.status(200).json({
            "users" : users
        });
      });
    }
  });
}

export default update;