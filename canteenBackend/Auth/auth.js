const jwt = require("jsonwebtoken");
const admin = require("../models/admin/admins");

const auth = async (req,res,next) => {
    console.log(req.body);
    const data = await jwt.verify(req.body.token,process.env.secret_key);
    console.log(data);
    const verify = await admin.findOne({username:data.username});
    const verified = verify.tokens.filter((ele)=>{
        return ele.token===req.body.token;
    });
    if(verified.length==0){
        throw new Error("Invalid Token");
    }
    next();
}
module.exports = auth;