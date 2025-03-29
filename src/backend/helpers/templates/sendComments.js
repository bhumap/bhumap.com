const sendComments =  (ownerName = "Bhumap User", text = "No comment available", propertyId = "#") => {

    return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Notification</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              padding: 20px;
              text-align: center;
          }
          .container {
              max-width: 600px;
              background: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              margin: auto;
          }
          .header {
              font-size: 22px;
              font-weight: bold;
              color: #333;
          }
          .content {
              margin: 20px 0;
              font-size: 16px;
              color: #555;
          }
          .button {
              display: inline-block;
              padding: 12px 20px;
              font-size: 16px;
              color: #fff;
              background: #007bff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
          }
          .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #777;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="header">🔔 New Notification Received!</div>
          <div class="content">
              <p>Hi <strong>${ownerName}</strong>,</p>
              <p>You have received a new notification:</p>
              <p><strong>${text}</strong></p>
              <p>Click the button below to view the details:</p>
              <a href="http://bhumap.com/property/${propertyId}" class="button">View Notification</a>
          </div>
          <div class="footer">
              Best,<br>
              <strong>Bhumap</strong><br>
              <a href="mailto:bhumaphousing@gmail.com">bhumaphousing@gmail.com</a> | <a href="https://www.bhumap.com/">https://www.bhumap.com/</a>
          </div>
      </div>
  </body>
  </html>`;
  };
  
  module.exports = {
      sendComments
  };
  