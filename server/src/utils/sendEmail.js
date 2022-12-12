const nodemailer = require('nodemailer')

module.exports = async (email, subject, text) => {
    try {
        console.log("Trying to send email")
        const transporter = nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:Number(process.env.EMAIL_PORT),
            secure:Boolean(process.env.SECURE),
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            }
        })
        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log("Server is ready to take our messages");
                    resolve(success);
                }
            });
        });
        const emailOptions = {
            from:process.env.USER,
            to:email,
            subject:subject,
            text:text
        }
        await new Promise((resolve, reject) => {
            transporter.sendMail(emailOptions, function(error, response){
                if(error){
                    console.log(error)
                    reject(error)
                }
                console.log(response)
                // return {message:'Email sent successfully', error:null}
                resolve(response)
            })
        })
    } catch (error) {
        console.log("Email not sent")
        return {error}
    }
}