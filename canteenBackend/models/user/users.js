const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true,
        minLength:1,
        unique:true
    },
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error("Invalid email");
            }
        }
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

userSchema.methods.generateAuthToken = async function(){
    console.log("hellooo");
    console.log({_id:this._id,password:this.password,username:this.username,email:this.email});
    try{
        const token = await jwt.sign({_id:this._id,password:this.password,username:this.username,email:this.email},process.env.secret_key);
        this.tokens = this.tokens.concat({token});
        await this.save();
        return token;
    }
    catch(error){
        console.log(error);

    }
}

userSchema.pre('save',async function (next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
        next();
    }
})

const user = new mongoose.model("user",userSchema);


module.exports = user;