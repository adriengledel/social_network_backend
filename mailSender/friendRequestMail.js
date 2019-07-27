import nodemailer from 'nodemailer';



const sendEmail = (email) => {

  let messageRequestFriend = {
    from: 'adriengledel@gmail.com',
    to: email,
    subject: 'Vous avez reçu une invitation ami !',
    text: 'Plaintext version of the message',
    html: '<p>HTML version of the message</p>'
  };

  const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    },
    tls:{
      rejectUnauthorized: false
    }
  });
  
  transporter.sendMail(messageRequestFriend , function(error, info){
    if (error) {
      console.log(error);
      res.status(200).json({
        "text": "Invalide email"
    });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        "text": "Succès",
        /* "token": user.getToken() */
      });
    }
  });

}

export default sendEmail;