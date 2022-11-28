const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const clientSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    verified:{
        type:Boolean,
        default:false
    }
})

clientSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})
clientSchema.statics.findByCredentials = async function({email,password}){
    let client
    client = await Client.findOne({email: email})
    if(!client) return {client: null,error:'No such client Found'}
    console.log(password)
    const isMatched = await bcrypt.compare(password.toString(),client.password)
    console.log(isMatched)
    if(!isMatched)
        return {client:null,error:'password is not correct.'}
    return {client,error:null}
}
clientSchema.methods.getAuthToken = function(){
    return jwt.sign({_id:this._id}, process.env.CLIENT_JWT_SECRET)
}
const Client = new mongoose.model('Client', clientSchema)

module.exports = Client