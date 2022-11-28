const router = require('express').Router()
const Client = require('../models/Client')
const jwt = require('jsonwebtoken')
const {S3Client, Type} = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')
require('dotenv').config()
// const bodyParser = require('body-parser')
const Application = require('../models/Application')
// const formidable = require('express-formidable')
// router.use(bodyParser.json())
// router.use(bodyParser.urlencoded({extended:true}))
// router.use(upload2.array())

const accessKey = process.env.AWS_ACCESS_KEY_VALUE
const secretKey = process.env.AWS_SECRET_ACCESS_KEY_VALUE

const s3 = new S3Client({
    credentials:{
        accessKeyId: accessKey,
        secretAccessKey:secretKey
    },
    region:'us-east-1',
})

const upload = multer({
    storage:multerS3({
        s3:s3,
        bucket:'ipr-management-system-bucket',
        ACL:'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        },
        limits:{fileSize:2000000 } // In bytes: 2000000 bytes = 2 MB
    })
})
router.use((req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization
    jwt.verify(token, process.env.CLIENT_JWT_SECRET, (error, payload) => {
        if(error){
            return res.status(403).json(error)
        }
        req.clientId = payload._id
        next()
    })
})
const uploadFields = [{name:'idProof', maxCount:1}, 
                      {name:'content', maxCount:1}, 
                      {name:'form1', maxCount:1}, 
                      {name:'form3', maxCount:1}, 
                      {name:'form5', maxCount:1}, 
                      {name:'form48'}]

router.post('/apply', upload.fields(uploadFields), async (req, res) => {
    try {
        console.log(req.body)  
        const clientId = req.clientId
        const title = req.body.title
        const idProof = req.files.idProof[0].location
        const content = req.body.docType == 'url'?req.body.content:req.files.content[0].location
        const description = req.body.desc
        const iprType = req.body.iprType
        // const contentType = req.body.contentType
        
        if(iprType == 'patent'){
            const form1 = req.files.form1[0].location
            const form3 = req.files.form3[0].location
            const form5 = req.files.form5[0].location
            
            const forms = Array.of(form1, form3, form5)
            const applicationData = {
                client_id:clientId, 
                title: title, 
                id_proof: idProof, 
                content: content, 
                description: description,
                ipr_type: iprType,
                forms: forms
            }
            const application = new Application(applicationData)

            await application.save()

            return res.status(200).json({
                application,
                error:null,
                message:'Application saved successfully'
            })
        }
        if(iprType == 'trademark'){
            const form48 = req.files.form48[0].location
            const forms = Array.of(form48)
            const applicationData = {
                client_id:clientId, 
                title: title, 
                id_proof: idProof, 
                content: content, 
                description: description,
                ipr_type: iprType, 
                // content_type: contentType,
                forms: forms
            }
            const application = new Application(applicationData)
            await application.save()

            return res.status(200).json({
                application,
                error:null,
                message:'Application saved successfully'
            })
        }
        if(iprType == 'copyright'){
            const applicationData = {
                client_id:clientId, 
                title: title, 
                id_proof: idProof, 
                content: content, 
                description: description,
                ipr_type: iprType, 
                // content_type: contentType,
            }
            const application = new Application(applicationData)
            await application.save()
            
            return res.status(200).json({
                application,
                error:null,
                message:'Application saved successfully'
            })
        }
        return res.status(403).json({
            message:'Something went wrong'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:error.message
        })
    }
})
router.get('/application-details', async (req, res) => {
    try {
        const selectedAttr = '_id title status description ipr_type createdAt'
        const pending = await Application.find({client_id:req.clientId,status:'PENDING'}).select(selectedAttr)
        const approved = await Application.find({client_id:req.clientId,status:'APPROVED'}).select(selectedAttr)
        const rejected = await Application.find({client_id:req.clientId,status:'REJECTED'}).select(selectedAttr)
        return res.status(200).json({
            applications:{
                pending,
                approved,
                rejected
            },
            message:'Application details fetched',
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