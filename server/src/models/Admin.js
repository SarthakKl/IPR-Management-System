const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminSchema = new mongoose.Schema({
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
adminSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})
adminSchema.statics.findByCredentials = async function({email,password}){
    const admin =  await Admin.findOne({email: email})
    if(!admin) return {admin: null,error:'No such admin Found'}
    console.log(password)
    const isMatched = await bcrypt.compare(password.toString(),admin.password)
    console.log(isMatched)
    if(!isMatched)
        return {admin:null,error:'password is not correct.'}
    return {admin,error:null}
}
adminSchema.methods.getAuthToken = function(){
    return jwt.sign({_id:this._id}, process.env.ADMIN_JWT_SECRET)
}
const Admin = new mongoose.model('Admin', adminSchema)

module.exports = Admin