const router = require('express').Router()
const Application = require('../models/Application')
const Client = require('../models/Client')
const jwt = require('jsonwebtoken')

router.use((req, res, next) => {
    try {
        console.log('hello jwt')
        const token = req.headers.authorization
        const payload = jwt.verify(token, process.env.REVIEWER_JWT_SECRET)
        if(payload._id){
            req.reviewerId = payload._id
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(403).json({
            error:error.message
        })
    }
})
router.get('/fetch-all-applications', async (req, res) => {
    try {
        const allApplications = await Application.find({status:'APPROVED'})
        // console.log(allApplications)
        return res.status(200).json({
            allApplications,
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})

router.get('/fetch-applications', async (req, res)=>{
    try {
        const pendingApplications = await Application.find({status:'PENDING', payment_status:'PAID'})
        const reviewingApplications = await Application.find({reviewer_id:req.reviewerId, status:'REVIEWING'})
        const reviewedApplications = await Application.find({reviewer_id:req.reviewerId, status:['APPROVED', 'REJECTED']})
        console.log(req.reviewerId, reviewedApplications)
        return res.status(200).json({
            applications:{
                pendingApplications, 
                reviewedApplications,
                reviewingApplications
            },
            message:'Application detail fetched',
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.json({
            error:error.message
        })
    }
})

router.get('/client-details', async (req, res) => {
    try {
        const client = await Client.findOne({_id: req.query.clientId})
        console.log(client)
        return res.status(200).json({
            client, 
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }
})
router.patch('/review-application', async (req, res) => {
    try {
        const application = await Application.findOne({_id:req.body.applicationId})
        if(application.reviewer_id != "" && application.reviewer_id != req.reviewerId)
            return res.status(401).json({
                error:'Already getting reviewed by someone else'
            })
        application.reviewer_id = req.reviewerId
        application.status = 'REVIEWING'
        await application.save()
        // const client = await Client.findOne({_id:req.body.clientId})
        console.log(application)
        return res.status(200).json({
            application,
            // client,
            message:"Application status updated successfully",
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error.message
        })
    }
})
router.patch('/complete-review', async (req, res) => {
    try {
        const status = req.body.status
        const application = await Application.findOne({_id:req.body.applicationId})
        application.status = status
        application.save()

        return res.status(200).json({
            application,
            message:"Application close successfully",
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:error.message
        })
    }
})
module.exports = router