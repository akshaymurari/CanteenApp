require('dotenv').config();

const express = require("express");

const axios = require("axios");

const {
    v4: uuidv4
} = require('uuid');

const https = require('https');

// const serveStatic = require('serve-static');

const path = require("path");

const formidable = require('formidable')

const PaytmChecksum = require("./Paytm/checksum");

const parseUrl = express.urlencoded({
    extended: false
});

const parseJson = express.json({
    extended: false
});


const fileUpload = require("express-fileupload");

const cors = require("cors");

const bodyParser = require("body-parser");

require("./database/dbconnect");

const app = express();

app.use(cors());

app.use(fileUpload());

app.use(bodyParser.urlencoded({
    extended: true
}));

// app.use(upload.array())

app.use(bodyParser.json())

app.use(express.json());

// const parseUrl = express.urlencoded({ extended: false });
// const parseJson = express.json({ extended: false });


const router = require("./router.js");

const userrouter = require("./userrouter.js");

app.use(router);

app.use(userrouter);
// C:\Users\akshay murari\canteenApp\canteenBackend\public\images
// C:\Users\akshay murari\canteenApp\canteenBackend\public\images\20201002_124842.jpg

console.log(path.join(__dirname, 'public', 'images'));

app.use(express.static(path.join(__dirname, 'public', 'images')));

const port = process.env.PORT || 8000;

app.get("/dd",(req,res)=>{
    console.log("fjjf")
    res.send("helloo");
})

app.post("/ff",(req,res)=>{
    res.redirect("/dd");
})

app.post('/callback', (req, res) => {
    console.log(req.body);
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, file) => {
        console.log(`fields : ${fields}`)
        fields=req.body
        paytmChecksum = fields.CHECKSUMHASH;
        delete fields.CHECKSUMHASH;
        var isVerifySignature = PaytmChecksum.verifySignature(fields, process.env.PAYTM_MERCHANT_KEY, paytmChecksum);
        console.log(isVerifySignature);
        if (isVerifySignature) {
            var paytmParams = {};
            paytmParams["MID"] = fields.MID;
            paytmParams["ORDERID"] = fields.ORDERID;
// {"TXNID":"20210418111212800110168690002530268","BANKTXNID":"64419556","ORDERID":"313fc939-0ee3-4d88-bef7-5de9cc5949a2","TXNAMOUNT":"1.00","STATUS":"TXN_SUCCESS","TXNTYPE":"SALE","GATEWAYNAME":"WALLET","RESPCODE":"01","RESPMSG":"Txn Success","BANKNAME":"WALLET","MID":"hQTIbQ06728282377422","PAYMENTMODE":"PPI","REFUNDAMT":"0.00","TXNDATE":"2021-04-18 17:29:27.0"}
            /*
            * Generate checksum by parameters we have in body
            * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
            */
            PaytmChecksum.generateSignature((paytmParams), process.env.PAYTM_MERCHANT_KEY).then(function(checksum){
            
                paytmParams["CHECKSUMHASH"]=checksum

            
                var post_data = JSON.stringify(paytmParams);
            
                var options = {
            
                    /* for Staging */
                    hostname: 'securegw-stage.paytm.in',
            
                    /* for Production */
                    // hostname: 'securegw.paytm.in',
            
                    port: 443,
                    path:"/order/status",
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': post_data.length
                    }
                };
                // {"TXNID":"20210418111212800110168690002530268","BANKTXNID":"64419556","ORDERID":"313fc939-0ee3-4d88-bef7-5de9cc5949a2","TXNAMOUNT":"1.00","STATUS":"TXN_SUCCESS","TXNTYPE":"SALE","GATEWAYNAME":"WALLET","RESPCODE":"01","RESPMSG":"Txn Su
                // ccess","BANKNAME":"WALLET","MID":"hQTIbQ06728282377422","PAYMENTMODE":"PPI","REFUNDAMT":"0.00","TXNDATE":"2021-04-18 17:29:27.0"}
                var response = "";
                let redirect = false;
                var post_req = https.request(options, function(post_res) {
                    post_res.on('data', function (chunk) {
                        response += chunk;
                    });
            
                    post_res.on('end', function(){
                        console.log('Response: ', response);
                        const msg = JSON.parse(response);
                        // res.json(msg);
                        if(msg.STATUS==="TXN_SUCCESS"){
                            console.log(msg)
                            // res.writeHead(200)
                            redirect=true
                        }
                        try{
                            // res.redirect("https://sequelize.org/master/manual/raw-queries.html");
                            // res.render("<h1>success</h1>")
                        }catch(error){
                            console.log(error);
                        }
                        
                        console.log("msg is",msg);
                        // res.end("sucess");
                        // res.send((response));
                        // res.redirect("http://localhost:3000/")
                    });
                });
                post_req.write(post_data);
                post_req.end();
                console.log("fkfkf")
                console.log(redirect);
                // res.redirect(307,"http://localhost:3000")
            });
            // res.redirect("http://localhost:3000/")
            
        } else {
            console.log("Checksum Mismatched");
            // res.send({
            //     "msg":"transaction failed"
            // })
        }
    });
})




app.post("/paynow", [parseUrl, parseJson], (req, res) => {
    // Route for making payment
    console.log("in paynow");
    console.log(req.body);
    var paymentDetails = {
        amount: req.body.amount,
        customerId: req.body.name,
        customerEmail: req.body.email,
        customerPhone: req.body.phone
    }
    if (!paymentDetails.amount || !paymentDetails.customerId || !paymentDetails.customerEmail || !paymentDetails.customerPhone) {
        res.status(400).send('Payment failed');
    } else {
        var params = {};
        params['MID'] = process.env.PAYTM_MID,
            params['WEBSITE'] = process.env.PAYTM_WEBSITE,
            params['ORDER_ID'] = uuidv4(),
            params['EMAIL'] = paymentDetails.customerEmail,
            params['CHANNEL_ID'] = 'WEB';
        params['INDUSTRY_TYPE_ID'] = 'Retail';
        params['CUST_ID'] = paymentDetails.customerId;
        params['TXN_AMOUNT'] = paymentDetails.amount;
        params['CALLBACK_URL'] = 'http://localhost:8000/callback';
        // params['EMAIL'] = paymentDetails.customerEmail;
        params['MOBILE_NO'] = paymentDetails.customerPhone;
        var paytmChecksum = PaytmChecksum.generateSignature(params, process.env.PAYTM_MERCHANT_KEY);
        paytmChecksum.then(function (checksum) {
            console.log("hellooo");
            let paytmParams = {
                ...params,
                "CHECKSUMHASH": checksum
            }
            res.json(paytmParams);

            // res.redirect(307,"http://localhost:3000")
        }).catch(function (error) {
            console.log(error);
        });
    }
});

app.listen(port, (error) => {
    if (error !== null) {
        console.log("server started ...");
    } else {
        console.log("error occured while starting the server");
    }
});