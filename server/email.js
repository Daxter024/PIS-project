const nodemailer = require("nodemailer");
require('dotenv').config();     // need it to use .env
const url = "https://procesos-6uh7rw7fha-no.a.run.app";
const varmg = require("./varManagement.js");
// const url = ""; // deployment url


// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD
//     }
// });
let options = {
    user : "",
    pass : ""
}

let transporter;

varmg.getOptions("EMAIL",function(res){
    console.log("i am in getOptions");
    options = res;
    transporter = nodemailer.createTransport({
        service: "gmail",
        auth: options
    });
});

module.exports.sendEmail = async function(email, key, men){
    const result = await transporter.sendMail({
        from: options.user,
        to: email,
        subject: men,
        text: "Press here to confirmate your account",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Account</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f6f6f6;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 50px auto;
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }
                .header {
                    background-color: #4CAF50;
                    color: #ffffff;
                    padding: 20px;
                    text-align: center;
                }
                .content {
                    padding: 30px;
                }
                .button {
                    display: block;
                    width: 200px;
                    margin: 20px auto;
                    padding: 10px 0;
                    text-align: center;
                    background-color: #4CAF50;
                    color: #ffffff;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 16px;
                }
                .footer {
                    background-color: #f1f1f1;
                    text-align: center;
                    padding: 20px;
                    font-size: 12px;
                    color: #888888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Welcome to Procesos App</h1>
                </div>
                <div class="content">
                    <h2>Verify Your Email Address</h2>
                    <p>Thank you for signing up with Procesos App. Please click the button below to verify your email address and complete your registration.</p>
                    <a href="${url}/verifyUser/${email}/${key}" class="button">Verify Email</a>
                    <p>If you did not create an account with Procesos App, please ignore this email.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Procesos App. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
    });
}