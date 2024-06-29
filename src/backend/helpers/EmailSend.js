"use server"
const axios = require("axios");

async function EmailSend(receiverEmail, receiverName, subject, message) {
  const apiEndpoint = "https://api.mailjet.com/v3.1/send";

  const auth = {
    username: process.env.MAILJET_API_KEY,
    password: process.env.MAILJET_SECRET_KEY,
  };

  const emailPayload = {
    Messages: [
      {
        From: {
          Email: process.env.MAILJET_SENDER_EMAIL,
          Name: process.env.MAILJET_SENDER_NAME,
        },
        To: [
          {
            Email: receiverEmail,
            Name: receiverName,
          },
        ],
        Subject: subject,
        TextPart: message,
        HTMLPart: `<p>${message}</p>`,
      },
    ],
  };

  const headers = {
    "Content-Type": "application/json",
  };

  // Making the API request using axios
  try {
    var { data } = await axios.post(apiEndpoint, emailPayload, {
      auth,
      headers,
    });
    return data;
  } catch (error) {
    console.error(
      "Failed to send email:",
      error.response ? error.response.data : error.message
    );
    return false;
  }
}

export default EmailSend;
