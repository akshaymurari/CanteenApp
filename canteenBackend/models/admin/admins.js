const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        minLength:1,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true     
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
});

adminSchema.methods.generateAuthToken = async function() {
    console.log(this);
    try{
        const token = await jwt.sign({_id:this._id,password:this.password,username:this.username},process.env.secret_key);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }
    catch(error){
        console.log(error);
    }
}

const admin = mongoose.model('admin', adminSchema);


module.exports = admin;