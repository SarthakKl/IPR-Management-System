const router = require('express').Router()
const Client = require('../models/Client')
const { helper } = require('../utils/mailHelper')
const jwt = require('jsonwebtoken')
const Reviewer = require('../models/Reviewer')
const Application = require('../models/Application')
const Admin = require('../models/Admin')

router.post('/client-login', async (req, res) => {
    try {
        console.log('finding user')
        const response = await Client.findByCredentials({ email: req.body.email, password: req.body.password })
        if (response.error)
            return res.status(404).json(response.error)
        console.log(req.body.email)
        const client = response.client
        console.log(client)
        if (!client.verified) {
            console.log('Email verification')
            const mailer = helper(client._id, req.body.email, 'client')
            console.log('mailer', mailer)
            if (mailer.error) {
                return res.status(500).json(mailer)
            }
            mailer.message='Email sent successfully'
            return res.status(200).json(
                mailer
            )
        }
        const token = client.getAuthToken()
        console.log(client)
        return res.status(200).json({
            message: 'Hello',
            client,
            token,
            error: null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
})

router.post('/client-signup', async (req, res) => {
    try {
        console.log('client signup', req.body)
        
        const client = new Client({
            userCategory: req.body.userCategory,
            fullname: req.body.fullname,
            email: req.body.email,
            contact:req.body.contact,
            password: req.body.pass,
            clientDescription: req.body.description
        })
        console.log(client)
        await client.save()
        
        const mailer = await helper(client._id, req.body.email, 'client')
        console.log(mailer)

        if (mailer.error)
            return res.status(500).json(mailer)

        return res.status(200).json(mailer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
})

router.patch('/verify-email', async (req, res) => {
    try {
        const token = req.body.token
        console.log(token)
        if (token) {
            jwt.verify(token, process.env.VERIFICATION_SECRET, async (error, payload) => {
                if (error) {
                    return res.status(400).json({
                        message: 'Verification link expired',
                        error: null
                    })
                }
                const userId = payload._id
                // console.log(userId)
                const client = await Client.findOne({ _id: userId })
                if (client) {
                    client.verified = true;
                    await client.save()
                    const token = client.getAuthToken()
                    console.log(token)
                    return res.status(200).json({
                        token,
                        client,
                        error: null,
                    })
                }
                const reviewer = await Reviewer.findOne({ _id: userId })
                if (reviewer) {
                    reviewer.verified = true;
                    await reviewer.save()
                    if(!reviewer.isAdminVerified){
                        return res.json({
                            message:'Not verified by admin',
                            error:null
                        })
                    }
                    const token = reviewer.getAuthToken()
                    console.log(token)
                    return res.status(200).json({
                        token,
                        reviewer,
                        error: null,
                    })
                }
                const admin = await Admin.findOne({_id:userId})
                if(admin){
                    admin.verified = true
                    await admin.save()
                    // console.log(admin)
                    const token = admin.getAuthToken()
                    // console.log(token)
                    return res.status(200).json({
                        token, 
                        admin, 
                        error:null
                    })
                }
                else {
                    return res.status(403).json({
                        message: "User not found!"
                    })
                }

            })
        }
        else
            return res.status(403).json({
                message: 'Token not found'
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
})
router.post('/reviewer-signup', async (req, res) => {
    try {
        console.log('reviewer signup')
        const reviewer = new Reviewer({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            password: req.body.password
        })
        await reviewer.save()

        const mailer = helper(reviewer._id, req.body.email, 'reviewer')
        console.log(mailer)

        if (mailer.error)
            return res.status(500).json(mailer)

        return res.status(200).json(mailer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        })
    }
})
router.post('/reviewer-login', async (req, res) => {
    try {
        console.log('finding user')
        const response = await Reviewer.findByCredentials({ email: req.body.email, password: req.body.password })
        if (response.error)
            return res.status(404).json(response.error)
        console.log(req.body.email)
        const reviewer = response.reviewer
        // console.log(reviewer)
        if (!reviewer.verified) {
            console.log(reviewer)
            const mailer = helper(reviewer._id, req.body.email, 'reviewer')
            if (mailer.error) {
                return res.status(500).json(mailer)
            }
            return res.status(200).json(mailer)
        }
        if(!reviewer.isAdminVerified){
            return res.json({
                message:'Not verified by admin',
                error:null
            })
        }
        const token = reviewer.getAuthToken()
        console.log(reviewer)
        return res.status(200).json({
            message: 'Hello',
            reviewer,
            token,
            error: null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
})
router.post('/admin-login', async (req, res) => {
    try {
        console.log('finding user')
        const response = await Admin.findByCredentials({ email: req.body.email, password: req.body.password })
        if (response.error)
            return res.status(404).json(response.error)
        console.log(req.body.email)
        const admin = response.admin
        // console.log(admin)
        if (!admin.verified) {
            console.log(admin)
            const mailer = await helper(admin._id, req.body.email, 'admin')
            if (mailer.error) {
                return res.status(500).json(mailer)
            }
            console.log(mailer)
            return res.status(200).json(mailer)
        }
        const token = admin.getAuthToken()
        // console.log(admin)
        console.log(token)
        return res.status(200).json({
            message: 'Hello',
            admin,
            token,
            error: null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: error.message
        })
    }
})
router.post('/admin-signup', async (req, res) => {
    try {
        console.log('admin signup')
        const admin = new Admin({
            fullname: req.body.fullname,
            email: req.body.email,
            mobile: req.body.mobile,
            address: req.body.address,
            password: req.body.password
        })
        await admin.save()

        const mailer = helper(admin._id, req.body.email, 'admin')
        console.log(mailer)

        if (mailer.error)
            return res.status(500).json(mailer)

        return res.status(200).json(mailer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: error.message
        })
    }
})
router.post('/payment-verification',async(req,res)=>{
    console.log("Webhook call form Razoarpay", new Date().toLocaleTimeString())
    console.log(req.body.payload.payment.entity)
    const application_id = req.body.payload.payment.entity.notes[0]
    const application = await Application.findById(application_id)
    application.payment_status  = "PAID"
    application.status  = "PENDING"
    await application.save()
    console.log(application)
    res.status(200).json({
        message:"Payment Successful",
        status:"ok"
    })
})
module.exports = router