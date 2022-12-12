const sgMail = require('@sendgrid/mail')

module.exports = async (email, subject, text) => {
    try {
        console.log(process.env.SENDGRID_API_KEY)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: email, // Change to your recipient
            from: process.env.USER, // Change to your verified sender
            subject: subject,
            text: text,
            html: '<strong>Sending email using Send grid</strong>',
        }
        sgMail.send(msg).then(() => {
            return {message:'successful', error:null}
          })
          .catch((error) => {
            console.error(error)
            return {error}
          })
        // return {message:"Email sent successfully", error:null}
    } catch (error) {
        console.log("Email not sent")
        return {error}
    }
}