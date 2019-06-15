import User from "../schema/schemaUser.js";
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
                  res.status(200).json({
                      "token" : user.getToken(),
                      "text"  : "Authentification réussi",
                      "user"  : user,
                      "users" : users
                  })
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