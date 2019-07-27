import nodemailer from 'nodemailer';



const sendEmail = (email) => {

  let messageRecommendFriend = {
    from: 'adriengledel@gmail.com',
    to: email,
    subject: 'Vous avez reçu une recommandation d"ami !',
    text: 'Plaintext version of the message',
    html: '<p>Vous avez reçu une recommandation d"ami de ...</p>'
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
  
  transporter.sendMail(messageRecommendFriend , function(error, info){
    if (error) {
      console.log(error);
      res.status(200).json({
        "text": "Invalide email"
    });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        "text": "Succès"
      });
    }
  });

}

export default sendEmail;