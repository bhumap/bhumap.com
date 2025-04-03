


const propertyQueryTemplate = (fullName,email,phone,message) =>{


    return `<!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background: #ffffff;
                                padding: 25px;
                                border-radius: 8px;
                                box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
                                text-align: center;
                            }
                            .title {
                                font-size: 22px;
                                color: #333;
                                margin-bottom: 20px;
                                font-weight: bold;
                            }
                            .info {
                                text-align: left;
                                font-size: 16px;
                                color: #555;
                                line-height: 1.6;
                            }
                            .info p {
                                margin: 8px 0;
                            }
                            .message-box {
                                background: #f9f9f9;
                                padding: 15px;
                                border-left: 4px solid #ff5722;
                                font-style: italic;
                                color: #333;
                                margin-top: 15px;
                            }
                            .footer {
                                text-align: center;
                                margin-top: 20px;
                                font-size: 14px;
                                color: #777;
                            }
                            .footer a {
                                color: #ff5722;
                                text-decoration: none;
                                font-weight: bold;
                            }
                        </style>
                    </head>
                    <body>

                    <div class="container">
                        <div class="title">New Contact Query</div>

                        <div class="info">
                            <p><strong>Full Name:</strong> ${fullName}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone Number:</strong> ${phone}</p>
                        </div>

                        <div class="message-box">
                            ${message}
                        </div>

                        <div class="footer">
                            <p>This email was sent via the Contact Us form.</p>
                            <p>Visit our website: <a href="https://bhumap.com" target="_blank">bhumap.com</a></p>
                        </div>
                    </div>

                    </body>
                    </html>
`
}

module.exports = {
    propertyQueryTemplate
}