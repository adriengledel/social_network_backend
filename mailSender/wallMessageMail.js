import nodemailer from 'nodemailer';



const sendEmail = (data) => {

  const email = data.email;
  const name = data.name;

  let wallMessage = {
    from: 'adriengledel@gmail.com',
    to: email,
    subject: 'Vous avez reçu un message sur votre profil !',
    text: 'Plaintext version of the message',
    html: `<p>${name} a écrit sur votre mur</p>`
  };
  
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'adriengledel@gmail.com',
      pass: 'MpC12bgSd45'
    },
    tls:{
      rejectUnauthorized: false
    }
  });
  
  transporter.sendMail(wallMessage , function(error, info){
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