"use server"
import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "mail.bhumap.com",
  port: 465,
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "info@bhumap.com",
    pass: "Bhumap@2024",
  },
});

function sendNodemail(receiverEmail, subject, message) {
  // send mail with defined transport object
  try {
    const info = transporter.sendMail({
      from: 'info@bhumap.com', // sender address
      to: receiverEmail, // list of receivers
      subject: subject, // Subject line
      html: message, // html body
    })
    
    return info
  } catch (error) {
    console.log(error)
     return false
  }

}

export default sendNodemail
