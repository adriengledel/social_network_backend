import users from "../schema/schemaUser";

export function updateUser(req, socket){
  users.findOneAndUpdate({_id : req.userId},
    {
      pseudo             : req.data.pseudo,
      email              : req.data.email,
      firstName          : req.data.firstName,
      lastName           : req.data.lastName,
      age                : req.data.age,
      genre              : req.data.genre,
      presentation       : req.data.presentation,
      preferences        : req.data.preferences,
      contactInformation : req.data.contactInformation
    },
    () => {
    users.find({}, (err, docs) => {
      var usersItems = {};
      docs.forEach(function (doc) {
        usersItems[doc._id] = doc;
      });
      socket.emit('updateUsers', usersItems);
      socket.broadcast.emit('updateUsers', usersItems);
    });
  });
}

export function isLogged(id, socket){
  users.findOneAndUpdate({_id : id},
    {
      logged : true
    },
    () => {
    users.find({}, (err, docs) => {
      var usersItems = {};
      docs.forEach(function (doc) {
        usersItems[doc._id] = doc;
      });
      socket.emit('updateUsers', usersItems);
      socket.broadcast.emit('updateUsers', usersItems);
    });
  });
}

export function isLogout(id, socket){
  users.findOneAndUpdate({_id : id},
    {
      logged : false
    },
    () => {
    users.find({}, (err, docs) => {
      var usersItems = {};
      docs.forEach(function (doc) {
        usersItems[doc._id] = doc;
      });
      socket.emit('updateUsers', usersItems);
      socket.broadcast.emit('updateUsers', usersItems);
    });
  });
}