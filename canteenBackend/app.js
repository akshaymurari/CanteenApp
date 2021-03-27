require('dotenv').config();

const express = require("express");

const serveStatic = require('serve-static')

const path = require("path");

const fileUpload = require("express-fileupload");

const cors = require("cors");

const bodyParser = require("body-parser");

require("./database/dbconnect");

const app = express();

app.use(cors());

app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(upload.array())

app.use(bodyParser.json())

app.use(express.json());


const router = require("./router.js");

app.use(router);

// C:\Users\akshay murari\canteenApp\canteenBackend\public\images
// C:\Users\akshay murari\canteenApp\canteenBackend\public\images\20201002_124842.jpg

console.log(path.join(__dirname, 'public','images'));

app.use(express.static(path.join(__dirname, 'public','images')));

const port = process.env.PORT || 8000;

app.listen(port,(error)=>{
    if(error!==null){
        console.log("server started ...");
    }
    else{
        console.log("error occured while starting the server");
    }
});


