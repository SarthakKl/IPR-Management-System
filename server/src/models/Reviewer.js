const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const schema = mongoose.Schema({
     fullname:{
        type:String, 
        required:true
     },
     email:{
        type:String,
        required:true
     },
     mobile:{
        type:String,
        required:true
     },
     address:{
        type:String,
        required:true
     },
     password:{
        type:String,
        required:true
     },
     verified:{
        type:Boolean,
        default:false
     }
})

schema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})
schema.statics.findByCredentials = async function({email,password}){
    const reviewer =  await Reviewer.findOne({email: email})
    if(!reviewer) return {reviewer: null,error:'No such reviewer Found'}
    console.log(password)
    const isMatched = await bcrypt.compare(password.toString(),reviewer.password)
    console.log(isMatched)
    if(!isMatched)
        return {reviewer:null,error:'password is not correct.'}
    return {reviewer,error:null}
}
schema.methods.getAuthToken = function(){
    return jwt.sign({_id:this._id}, process.env.REVIEWER_JWT_SECRET)
}
const Reviewer = new mongoose.model('Reviewer', schema)

module.exports = Reviewer