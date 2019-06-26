import friends from "../schema/schemaFriend.js";

export function friendRequest(req, res) {
  console.log('requete :', req.body)
  var friendSender = {
    id : req.body.userIdSender,
    userId : [{ id : req.body.userIdRecipient, statusId : 2 }]
  }

  var friendRecipient = {
    id : req.body.userIdRecipient,
    userId : [{ id : req.body.userIdSender, statusId : 5 }]
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
              statusId : 2
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
              statusId : 5
            }
          }
        },  function(err, result){
            
            });
    }
  });

}


export function updateFriend(req, res){
  console.log(req.body)
  friends.findOneAndUpdate(
    { id : req.body.userIdSender,  'userId.id' : req.body.userIdRecipient },
      { $set:
        {
          'userId.$.statusId' :  req.body.statusIdSender
        }
      }, 
      function(err, result){
          
      });
  
  
  friends.findOneAndUpdate(
    {id : req.body.userIdRecipient, 'userId.id' : req.body.userIdSender },
      { $set:
        {
          'userId.$.statusId' :  req.body.statusIdRecipient
        }
      }, 
      function(err, result){
          
      });
  }
  