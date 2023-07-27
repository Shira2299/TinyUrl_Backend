import { query } from "express";
import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
const password = "kdpwyemiszabglag";
const fromEmail = "shiramail2299@gmail.com";
const MailSender = {
    sendEmail:async(req,res)=>{
    console.log('send email')
      
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
            user: fromEmail, 
            UserName: "TinyUrl",
            pass: password,       
            },
        });
        const mail = req.params.mail;
        let tinyUrl = null;
        if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
            console.log('req.query is empty');
            tinyUrl = 'http://localhost:3000/'+req.params.tinyUrl; 
          } else {
            console.log('req.query is not empty');
              const firstKey = Object.keys(req.query)[0];
            //   let val;
              console.log('firstKey',firstKey);
              const sum = req.query[firstKey];
              const [value1, value2] = sum.split(',');
            //   val = value1;
              console.log('Value 1:', value1);
              tinyUrl = 'http://localhost:3000/' + req.params.tinyUrl + '?' + firstKey + '=' + value1;
          }
           
const htmlBody = `
    <html>
    <head>
        <style>
            /* Add your CSS styles here */
            .email-frame {
                border: 2px solid #333;
                padding: 30px;
                background-color: #242424;
                font-family: Arial, sans-serif;
                color: #fff;
                width: 50%;
            }
            
            .title {
                color: #ae8abb;
                font-size: 36px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            
            .subtitle {
                color: #ccc;
                font-size: 22px;
                margin-bottom: 20px;
            }
            
            .link {
                color: #8bc34a;
                text-decoration: none;
            }
            
            .link:hover {
                text-decoration: underline;
            }
            
            .amazing {
                color: #8bc34a;
                font-size: 20px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
      <center>
        <div class="email-frame">
            <h1 class="title">Welcome to <span style="color: #8bc34a">TinyUrl</span></h1>
            <p class="subtitle">Click the link below to access your <span style="color: #8bc34a">TinyUrl</span></p>
            <a class="link" href="${tinyUrl}">${tinyUrl}</a>
            <p class="amazing">!Thank you for using our amazing service</p>
        </div>
      </center>    
    </body>
    </html>
`;

        let info = await transporter.sendMail({
            from: "TinyUrl", // sender address 'shiramail2299@gmail.com'
            MailSender: "TinyUrl",
            userName: "TinyUrl",
            to: mail, // list of receivers
            subject: "TinyUrl", // Subject line "Hello ✔"
            // text: tinyUrl, // plain text body  
            html: htmlBody // HTML body  
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
}

export default MailSender;