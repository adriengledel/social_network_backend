import friends from "../schema/schemaFriend.js";

function friendRequest(req, res) {
  console.log(req.body)
  var friendSender = {
    id : req.body.userIdSender,
    userId : [{ id : req.body.userIdRecipient, statusId : 1,  status : 'request send' }]
  }

  var friendRecipient = {
    id : req.body.userIdRecipient,
    userId : [{ id : req.body.userIdRecipient, statusId : 4,  status : 'request received' }]
  }

  friends.findOne({ id : req.body.userIdSender }, (err, result) =>{
    if(result === null){
      new friends(friendSender).save();
    }
    else {
      friends.updateOne(
        { id :req.body.userIdSender},
        { $addToSet: 
          {userId :
            { id : req.body.userIdRecipient, 
              statusId : 1,  
              status : 'request send'
            }
          }
        }, function(err, result){
        console.log(err)
        console.log(result);
      });
    }
  });

  friends.findOne({ id : req.body.userIdRecipient }, (err, result) =>{
    if(result === null){
      new friends(friendRecipient).save();  
    }
    else {
      friends.updateOne(
        { id :req.body.userIdRecipient},
        { $addToSet:
          {userId :
            { id : req.body.userIdSender, 
              statusId : 1,  
              status : 'request send'
            }
          }
        }, function(err, result){
        console.log(err)
        console.log(result);
      });
    }
  });

}

/* friends.findOne({ 'userId.id' : req.body.userIdRecipient }, function(err , result){
 console.log(result)
 if(result === null){
   console.log('ok')
    friends.update({'id' : req.body.userIdSender},{$addToSet: {'userId' :{ id : req.body.userIdRecipient, statusId : 1,  status : 'request send' }}});
 }
}); */
export default friendRequest;