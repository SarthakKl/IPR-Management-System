const asyncHandler = require('express-async-handler')
const Application = require('../models/Application')
const crypto = require('crypto')

exports.createOrder = asyncHandler(async (req, res, next) => {
    const application = await Application.findById(req.body.applicationId);
    console.log("Creating Order for : ",application._id)
    const Razorpay = require('razorpay');
    var instance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })
    var options = {
        amount: application.application_fee,  // amount in the smallest currency unit
        currency: "INR",
    };
    instance.orders.create(options, function(err, order) {
        if(err){
            return res.json({
                error:err
            })
        }
        return res.json({
            order:{
                ...order,
                name:"Ipr Mangement",
                image: "https://i.ibb.co/h8Yjv2h/logo.png",
                key:process.env.RAZORPAY_KEY_ID,
                
                prefill: {
                    name: req.client.fullname,
                    email: req.client.email,
                    contact: "9000090000"
                },
                "notes": [application._id],
            },
            error:null
        })
    });
})

exports.verifyPayment = asyncHandler(async (req, res) => {
    console.log('Inside verify payment: '+ req.body)
    const body = req.body.orderId+ "|" + req.body.paymentId
    const razorpaySignature = req.body.razorpaySignature
    console.log(req.body.razorpaySignature)
    const generated_signature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
                                        .update(body.toString())
                                        .digest('hex');
    console.log(razorpaySignature+" "+generated_signature)
    if(generated_signature === razorpaySignature){
        
        const application = await Application.findOneAndUpdate({_id:req.body.applicationId},
                                            {$set:{order_id:req.body.orderId, payment_status:'PAID'}})
        console.log(application)
        return res.json({
            application, 
            error:null
        })
    }
    return res.json({
        error:'Payment verification failed'
    })
})