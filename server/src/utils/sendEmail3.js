const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const env = require('dotenv')

env.config()
// const { randomValueHex } = require("../utils/generateValue");

//these we get from google auth console
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;  // it changes with some time period

//google api installation

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


module.exports= sendEmail = async (receiverEmail,subject, link) => {
    try {
      // console.log("hehfhehfehfheh");
      console.log(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
      const accessToken = await oAuth2Client.getAccessToken();
      // console.log("link: "+msg);
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: 'sarthakk60@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
        tls: { rejectUnauthorized: false },
      });

     
      const mailOptions = {
        from: "IPR Management System <sarthakk60@gmail.com>",
        to: receiverEmail,
        subject: subject,
        text: "Mail for verification.", // plain text body
        html:`<div style="background-color:#F9F9F9; padding:12px"><h2>Hello,Verfiy your account by clicking on the Link.<br>${link}<p style="color:#000000; background-color:#F5EFE6"; text-align:center">Valid only for 10 minutes</p></div>`, // html body
      };

      
        await transport.sendMail(mailOptions);
        
        return {
          status:401,
          message:"Email sent Successful"
        }

    } catch (error) {
        return {
          status:501,
          message:error.message
        }
    }
}