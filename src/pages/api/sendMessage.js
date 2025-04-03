import { sendEmail } from "@/src/backend/helpers/sendNodemail";
import { propertyQueryTemplate } from "@/src/backend/helpers/templates/propertyQuery";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, email, phoneNumber, message, ownerEmail } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mdsamsher530@gmail.com",
        pass: "cixw lxuz yczy vsor",
      },
    });

    const mailOptions = {
      from: email,
      to: ownerEmail,
      subject: `Message from ${fullName}`,
      html: `
        <h1>Message from ${fullName}</h1>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    try {
        
      await sendEmail({
        receiverEmail: ownerEmail,
        subject: `Message from ${fullName}`,
        message,
        html: propertyQueryTemplate(fullName,email,phoneNumber,message)
      })
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
