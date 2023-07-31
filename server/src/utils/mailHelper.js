// const sendEmail = require('./sendEmail1')
const sendEmail = require('./sendEmail')
const jwt = require('jsonwebtoken')

module.exports.helper = async (userId, email, user) => {
    try {
        console.log(userId, email)
        const token = jwt.sign({_id:userId}, process.env.VERIFICATION_SECRET, {expiresIn: 10 * 60})
        const url = `${process.env.BASE_URL}verify/${user}/${token}`
        const mailResponse =  await sendEmail(email, 'EMAIL VERIFICATION', url)
        // console.log(mailResponse)
        if(mailResponse.error) 
            throw Error(mailResponse.error)
        return mailResponse
    } catch (error) {
        console.log(error)
        return {error: error.message}
    }
}