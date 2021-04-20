const express = require('express');

const Razorpay = require("razorpay");

const shortid = require("shortid");

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const recievedFood = require("./models/admin/recievedFood");

const user = require("./models/user/users");

const admin = require("./models/admin/admins");

const food = require("./models/admin/food.js");

const auth = require("./Auth/auth");

const router = new express.Router();

const razorpay = new Razorpay({
	key_id: 'rzp_test_qJLV4RcpSNFD8a',
	key_secret: 'SEE7nABntHyRRSy2fsequL6O'
})


router.get("",(req,res) => {
    res.send("hello...");
});

router.post("/verification",async (req,res)=>{
    const secret = "12345678"
    console.log("heloo");
    console.log(req.body.payload.payment.entity);
    const _id=req.body.payload.payment.entity.description;
    console.log(_id);
    const crypto = require('crypto')

	const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log(digest, req.headers['x-razorpay-signature'])

	if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit');
        try{
            const data = await recievedFood.updateOne({_id},{
                status:"paid"
            })
            console.log(data);
            res.status(200).send({"msg":"ok"})

        }catch{
            res.status(400).send("invalid");
        }
		// process it
		// require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
	} else {
        res.status(400).send("invalid");
		// pass it
	}
})



router.post("/razorpay",async (req,res)=>{
    console.log(req.body)
    const payment_capture = 1
	const amount = new Number(req.body.amount);
	const currency = 'INR'

	const options = {
		amount: (amount * 100).toString(),
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

router.post("/register",async (req,res) => {
    console.log(req.body);
    try{
        console.log(req.body);
        req.body.func = "register";
        const data = user(req.body);
        const token = await data.generateAuthToken();
        console.log(token);
        const result = await data.save();
        res.status(200).send({token});
    }
    catch(error){
        console.log(`${error}`);
        res.status(400).send(error);
    }
});

// router.post("/userlogin", async (req,res) => {
//     try{
//         const data = await user.findOne({username:req.body.username});
//         const result = await bcrypt.compare(req.body.password,data.password);
//         if(result){
//             const token = await data.generateAuthToken();
//             res.status(200).send({token});
//         }
//         else{
//             res.status(400).send({result});
//         }
//     }
//     catch(error){
//         console.log(error);
//     }
// });

router.post("/adminlogin", async (req,res) => {
    // res.status(200).send(req.body);
    console.log(req.body.username);
    try{
        const data = await admin.findOne({username:req.body.username});
        // console.log(data);
        const result = await bcrypt.compare(req.body.password,data.password);
        if(result){
            const token = await data.generateAuthToken();
            res.status(200).send({token});
        }
        else{
            res.status(400).send({result});
        }
    }
    catch(error){
        console.log(`error in adminlogin ${error}`);
    }
});

router.delete("/admin",async (req, res) => {
    try{
        const result = await jwt.verify(req.body.token,process.env.secret_key);
        const user = await admin.findOne({username:result.username});
        const data = user.tokens.filter((ele)=>{
            return ele.token !== req.body.token;
        });
        user.tokens = data;
        await user.save();
        res.status(200).send({"msg":"success"});
    }
    catch{
        res.status(400).send({"msg":"invalid token"});
    }
})

router.post("/verifyadminuser",async (req,res) => {
    try{
        // console.log(req.body);
        const token = jwt.verify(req.body.token,process.env.secret_key);
        // console.log(token);
        const data = await admin.findOne({username:token.username});
        // console.log(data);
        const result = data.tokens.filter((ele)=>{
            return ele.token==req.body.token;
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

router.post("/addFooditems",async (req,res) => {
    // console.log(req.files);
    const baseurl = req.protocol + "://" + req.get("host");
    const data = JSON.parse(req.body.data);
    var path=null;
    if(req.files === null){
        console.log("file not uploaded");
            data.pic="";

    }
    else{
        const file = req.files.file;
        const result = await file.mv(`${__dirname}/public/images/${data.fooditem}.jpg`);
        // console.log("result is");
        if(result){
            data.pic="";
        }
        else{
            data.pic=baseurl+"/"+data.fooditem+".jpg";
        }
        // console.log(result);
    }
    try{
        // console.log(data);
        const result = food(data);
        // console.log(result);
        const data1 = await result.save();
        // console.log(data1);
        res.status(200).send({"msg":"added"});
    }
    catch(error){
        // console.log(error);
        res.status(400).send({"msg":"not added"});
    }
});

router.post('/fooditemsadmin',async (req,res) => {
    try{
        console.log(req.body);
        const data = await jwt.verify(req.body.token,process.env.secret_key);
        console.log(data);
        const verify = await admin.findOne({username:data.username});
        const verified = verify.tokens.filter((ele)=>{
            return ele.token===req.body.token;
        });
        if(verified.length==0){
            console.log("invalid token");
            res.status(400).send({"msg":"INVALID TOKEN"});
        }
        else{
            const result = await food.find({});
            res.status(200).send(result);
        }
    }
    catch(error){
        console.log(error)
        res.status(400).send({"msg":"INVALID TOKEN"});
    }
});

router.patch("/fooditemsadmin",auth,async (req,res) => {
    const update = {$inc:{quantity:req.body.quantity}}
    try{
        const result = await food.updateOne({
            fooditem: req.body.fooditem
        },update);
        res.status(200).send(result);
    }
    catch{
        res.status(400).send({"msg":"INVALID token"})
    }
});

router.delete("/fooditemsadmin",auth,async (req,res) => {
    try{
        const result = await food.deleteMany({});
        console.log(result);
        res.status(200).send(result);
    }
    catch{
        res.status(400).send({"msg":"INVALID token"});
    }
});




module.exports = router;