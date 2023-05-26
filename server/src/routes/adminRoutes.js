const router = require('express').Router()
const jwt = require('jsonwebtoken')
const Application = require('../models/Application')
const Admin = require('../models/Admin')
const Reviewer = require('../models/Reviewer')
const Client = require('../models/Client')

router.use(async (req, res, next) => {
    try {
        console.log('hello jwt')
        const token = req.headers.authorization || req.headers.Authorization
        const payload = await jwt.verify(token, process.env.ADMIN_JWT_SECRET)
        const admin = await Admin.findById(payload._id)
        if(!admin){
            return res.json({
                error:"Admin not found"
            })
        }
        console.log(payload)
        req.adminId = payload._id
        next()
    } catch (error) {
        console.log(error)
        res.status(403).json({
            error:error.message
        })
    }
})
router.get('/fetch-all-applications', async (req, res) => {
    try {
        const allApplications = await Application.find({})
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
router.get('/fetch-reviewer-signups', async (req, res) => {
    try{
        const reviewerSignups = await Reviewer.find({isAdminVerified: {$ne:true}, rejectionReason:''})
        console.log({reviewerSignups})
        return res.json({
            reviewerSignups,
            error:null
        })
    }
    catch(error){
        console.log(error)
        return res.json({
            error:error.message
        })
    }
})
router.post('/reject-reviewer-signup', async (req, res) => {
    try {
        const reviewer = await Reviewer.findOne({_id:req.body.reviewerId})
        reviewer.rejectionReason = req.body.rejectionReason
        await reviewer.save()
        return res.json({
            message:'Reviewer rejected',
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.json({
            error:error.message
        })
    }
}) 
router.post('/approve-reviewer-signup', async (req, res) => {
    try {
        const reviewer = await Reviewer.findOne({_id:req.body.reviewerId})
        reviewer.isAdminVerified = true;
        console.log(reviewer)
        await reviewer.save()
        return res.json({
            message:`Reviewer ${reviewer.fullname} has been verified`,
            error:null
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error:null
        })
    }
})
router.get('/get-client-details', async (req, res) => {
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
router.get('/fetch-queries', async (req, res) =>{
    //ToDo
})

module.exports = router