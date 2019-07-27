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