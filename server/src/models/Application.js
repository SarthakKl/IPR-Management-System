const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    content:{
        type:[String],
        required:true
    },
    ipr_type:{
        type:String,
        required:true
    },
    content_type:{
        type:String,
        default:""
    },
    clientName:{
        type:String,
        required:true
    },
    forms:{
        type:[String],
        default:[]
    },
    id_proof:{
        type:String,
        required:true
    },
    client_id:{
        type:String,
        required:true
    },
    reviewer_id:{
        type: String,
        default:""
    },
    status:{
        type:String,
        enum:['APPROVED', 'REJECTED', 'PENDING', 'REVIEWING'],
        default:'PENDING'
    },
    payment_status:{
        type:String,
        enum:['PAID','UNPAID'],
        default:'UNPAID'
    },
    description:String,
    title:{
        type:String,
        required:true
    },
    order_id:String,
    application_fee:{
        type:Number, 
        default:5000
    }
    
},{timestamps:true})

const model = mongoose.model('Application', applicationSchema)

module.exports = model