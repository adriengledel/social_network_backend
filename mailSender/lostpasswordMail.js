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