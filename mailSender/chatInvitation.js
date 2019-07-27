import nodemailer from 'nodemailer';



const sendEmail = (data) => {

  const email = data.email;
  const name = data.name;

  let chatInvitation = {
    from: 'adriengledel@gmail.com',
    to: email,
    subject: 'Vous avez reçu une invitation de chat !',
    text: 'Plaintext version of the message',
    html: `<p> ${name} vous a envoyé une demande de chat privée</p>`
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

  transporter.sendMail(chatInvitation , function(error, info){
    if (error) {
      console.log(error);
      res.status(200).json({
        "text": "Invalide email"
    });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({
        "text": "Succès",
      });
    }
  });

}

export default sendEmail;