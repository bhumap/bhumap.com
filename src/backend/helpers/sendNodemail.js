"use server"

const nodemailer = require("nodemailer");




// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhumapmail@gmail.com', 
    pass: 'slkz kldg ppvv pqag', 
  },
});



// Function to send an email
async function sendEmail({receiverEmail, subject, message, html}) {
    
  console.log(receiverEmail, subject,message,":::::::::::::::::::::::::::::::::::::")
  const mailOptions = {
    from: 'bhumapmail@gmail.com', 
    to: receiverEmail,
    subject: subject,
    text: message,
    html
  };

  try {
      await transporter.sendMail(mailOptions);    
  } catch (error) {
    console.error('Error sending email:', error);
  }
} 



module.exports = { sendEmail };