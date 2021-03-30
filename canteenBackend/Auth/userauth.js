const jwt = require("jsonwebtoken");
const user = require("../models/user/users")

const userauth = async (req,res,next)  => {
    try{
        const token = req.body.token;
        const data = jwt.verify(token,process.env.secret_key);
        console.log(data);
        console.log(token.toString());
        const result = await user.findOne({
            username:data.username
        }); 
        console.log(result);
        const verifiedTokens = result.tokens.filter((ele) => {
            return ele.token === token
        });
        if(verifiedTokens.length==0){
            throw new Error("INVALID TOKEN");
        }
        else{
            req.user = data;
        }
    }
    catch(error){
        console.log(error);
    }
    next();
}
module.exports = userauth