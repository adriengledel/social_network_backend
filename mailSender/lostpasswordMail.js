import nodemailer from 'nodemailer';


const sendEmail = (data, res) => {

  let password = data.password;
  let email    = data.email;

  let messageLostpassword = {
    from: 'adriengledel@gmail.com',
    to: email,
    subject: 'Votre nouveau mot de passe !',
    text: 'Plaintext version of the message',
    html: `<p>Voici votre nouveau mot de passe ${password}</p>`
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
  
  transporter.sendMail(messageLostpassword , function(error, info){
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