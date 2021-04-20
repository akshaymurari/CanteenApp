const express = require("express");

const user = require("./models/user/users");

const bcrypt = require("bcrypt");

const userrouter = new express.Router();

const auth = require("./Auth/auth");

const jwt = require("jsonwebtoken");

const userauth = require("./Auth/userauth");

// const checksum_lib = require("./paytm/checksum/checksum");

const food = require("./models/admin/food");

const Paytm = require('paytm-pg-node-sdk');

const recievedFood = require("./models/admin/recievedFood");

userrouter.get("/user",(req,res) => {
    res.send("in user router");
});

userrouter.post("/userlogin",async (req,res) => {
    console.log(req.body);
    try{
        const result = await user.findOne({username:req.body.username});
        const data = await bcrypt.compare(req.body.password,result.password);
        console.log(data);
        if(data){
            const token = await result.generateAuthToken();
            console.log(`token is ${token}`);
            res.status(200).send({"token":token});
        }
        else{
            res.status(400).send({"msg":"INVALID TOKEN"});
        }
    }
    catch{
        res.status(400).send({"msg":"INVALID TOKEN"})
    }
});

userrouter.post("/verifyuser",async (req,res) => {
    try{
        // console.log(req.body);
        const token = jwt.verify(req.body.token,process.env.secret_key);
        // console.log(token);
        const data = await user.findOne({username:token.username});
        // console.log(data);
        const result = data.tokens.filter((ele)=>{
            return ele.token===req.body.token;
        });
        // console.log(result);
        if(result.length==0){
            res.status(400).send({msg:"invalid token"});
        }
        else{
            res.status(200).send({msg:"authenication sucesss"});
        }
    }
    catch(error){
        res.status(400).send({msg:"invalid token"});
    }
});


userrouter.get("/FoodStore",async (req, res) => {
    try{
        const result = await food.find({});
        console.log(result);
        res.status(200).send(result)
    }
    catch{
        res.status(400).send({msg:"internal server error"});
    }
});

userrouter.patch("/buyitem",userauth,async (req,res) => {
    console.log(req.body);
    try{
        const result = await food.updateOne({
            $and:[
                {fooditem:req.body.fooditem},
                {quantity:{$gte:req.body.quantity}}
            ]
        },{
            $inc:{quantity:-req.body.quantity}
        });
        console.log(result);
        if(result.nModified==0){
            res.status(400).send({"msg":"stock overflow"})
        }
        else{
            console.log(`req.user is ${req.user}`);

            const data = await recievedFood({
                username:req.user.username,
                status:"not paid",
                item:req.body.fooditem,
                quantity:req.body.quantity,
                totalAmount:parseInt(req.body.quantity)*(req.body.price)
            });
            console.log(data);
            await data.save();
            res.status(200).send(data);
        }
        // const data = await result.updateOne({quantity:{$gte:0},[$inc:{quantity:-req.body.quantity}]});
    }
    catch(error){
        console.log(error);
        res.status(400).send({"msg":"stock overflow"})
    }
});

// router.patch()

userrouter.get("/recievedFood",auth,async (req,res)=>{
    try {
        const result = await recievedFood.find({});
        res.status(200).send({"msg":"success"});
    }
    catch{
        res.status(400).send("error");
    }
});

userrouter.delete("/recievedFood",auth,async (req,res) => {
    try{
        const result = await recievedFood.deleteOne({
            _id:req.body._id
        });
        console.log(result);
        res.status(200).send({"msg":"success"});
    }
    catch{
        res.status(400).send("error");
    }
});

userrouter.post("/recievedFood/:username",async (req,res) => {
    const query = req.params.username;
    console.log("hellooo")
    console.log(query);
    try{
        if(query==="all"){
            const result = await recievedFood.find({
            });
            console.log(result);
            console.log("hiiii")
            res.status(200).send(result);
        }
        else{
            const result = await recievedFood.find({
                username:{$regex:query,$options:"i"}
            });
            console.log(result);
            console.log("hiiii")
            res.status(200).send(result);
        }
    }
    catch{
        res.status(400).send("error");
    }
})

module.exports = userrouter;

