import User from "../schema/schemaUser.js";
import friends from "../schema/schemaFriend.js";
import walls from "../schema/schemaWall";
import topics from "../schema/schemaTopic";
import passwordHash from "password-hash";

function login(req, res) {
    if (!req.body.email || !req.body.password) {
      //Le cas où l'email ou bien le password ne serait pas soumit ou nul
      res.status(400).json({
          "text": "Requête invalide"
      })
  } else {
      User.findOne({
          email: req.body.email
      }, function (err, user) {
          if (err) {
              res.status(500).json({
                  "text": "Erreur interne"
              })
          } else if (!user) {
              res.status(401).json({
                  "text": "L'utilisateur n'existe pas"
              })
          } else {
              if (user.authenticate(req.body.password)) {
                user.logged = true;
                User.find({}, function(err, docs){
                    var users = {};
                    docs.forEach(function (doc) {
                        users[doc._id] = doc;
                    });
                    friends.find({}, function(err, friends){
                        walls.find({}, function(err, documents){
                            var wallmessages = {};
                            documents.forEach(function (document) {
                                wallmessages[document.userId] = document;
                            });
                            topics.find({}, function(err, topics){
                                res.status(200).json({
                                    "token" : user.getToken(),
                                    "text"  : "Authentification réussi",
                                    "user"  : user,
                                    "users" : users,
                                    "friends" : friends,
                                    "walls" : wallmessages,
                                    "topics": topics
                                });
                            });
                        });
                    });
                });
              } else {
                  res.status(401).json({
                      "text": "Mot de passe incorrect"
                  })
              }
          }
      })
  }
}

export default login;