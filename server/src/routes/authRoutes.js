const router = require('express').Router()
const Client = require('../models/Client')
const { helper } = require('../utils/mailHelper')
const jwt= require('jsonwebtoken')
const Reviewer = require('../models/Reviewer')

router.post('/client-login', async (req, res) => {
    try {
        console.log('finding user')
        const response = await Client.findByCredentials({email: req.body.email, password:req.body.password})
        if(response.error)
            return res.status(404).json(response.error)
        console.log(req.body.email)
        const client = response.client
        // console.log(client)
        if(!client.verified){
            console.log(client)
            const mailer = helper(client._id, req.body.email, 'user')
            if(mailer.error){
                return res.status(500).json(mailer)
            }
            return res.status(200).json(mailer)
        }
        const token = client.getAuthToken()
        console.log(client)
        return res.status(200).json({
            message:'Hello',
            client, 
            token, 
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
})

router.post('/client-signup', async(req, res) => {
    try {
        console.log('client signup')
        const client = new Client({
            fullname:req.body.fullname, 
            email:req.body.email, 
            password:req.body.password
        })
        await client.save()

        const mailer = helper(client._id, req.body.email, 'user')
        console.log(mailer)

        if(mailer.error)
            return res.status(500).json(mailer)

        return res.status(200).json(mailer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
})

router.patch('/verify-email', async (req, res) => {
    try {
        const token = req.body.token
        console.log(token)
        if(token){
            jwt.verify(token, process.env.VERIFICATION_SECRET, async (error, payload) => {
                if(error){
                    return res.status(400).json({
                        message:'Verification link expired',
                        error: null
                    })
                }
                const userId = payload._id
            // console.log(userId)
                const client = await Client.findOne({_id:userId})
                if(client){
                    client.verified = true;
                    await client.save()
                    const token = client.getAuthToken()
                    console.log(token)
                    return res.status(200).json({
                        token,
                        client,
                        error:null,
                    })
                }
                const reviewer = await Reviewer.findOne({_id:userId})
                if(reviewer){
                    reviewer.verified = true;
                    await reviewer.save()
                    const token = reviewer.getAuthToken()
                    console.log(token)
                    return res.status(200).json({
                        token,
                        reviewer,
                        error:null,
                    })
                }
                else{
                    return res.status(403).json({
                        message:"User not found!"
                    })
                }
                
            })
        }
        else
            return res.status(403).json({
                message:'Token not found'
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
})
router.post('/reviewer-signup', async (req, res) => {
    try {
        console.log('reviewer signup')
        const reviewer = new Reviewer({
            fullname:req.body.fullname, 
            email:req.body.email, 
            mobile:req.body.mobile,
            address:req.body.address,
            password:req.body.password
        })
        await reviewer.save()

        const mailer = helper(reviewer._id, req.body.email, 'reviewer')
        console.log(mailer)

        if(mailer.error)
            return res.status(500).json(mailer)

        return res.status(200).json(mailer)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error.message
        })
    }
})
router.post('/reviewer-login', async (req, res) => {
    try {
        console.log('finding user')
        const response = await Reviewer.findByCredentials({email: req.body.email, password:req.body.password})
        if(response.error)
            return res.status(404).json(response.error)
        console.log(req.body.email)
        const reviewer = response.reviewer
        // console.log(reviewer)
        if(!reviewer.verified){
            console.log(reviewer)
            const mailer = helper(reviewer._id, req.body.email, 'reviewer')
            if(mailer.error){
                return res.status(500).json(mailer)
            }
            return res.status(200).json(mailer)
        }
        const token = reviewer.getAuthToken()
        console.log(reviewer)
        return res.status(200).json({
            message:'Hello',
            reviewer, 
            token, 
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
})

module.exports = router