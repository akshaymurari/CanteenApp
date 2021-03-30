import React,{useState,useEffect} from 'react';
import {Baseurl} from './App.js';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

const verifyToken = async (H) => {
    console.log("hellooo")
    const token = localStorage.getItem("userToken");
    try{
        const result = await axios({
            method:"post",
            url:`${Baseurl}/verifyuser`,
            headers:{
                "content-type":"application/json",
                "Accept": "application/json"
            },
            data:JSON.stringify({token})
        });
        console.log(result.data);
    }
    catch(error){
        console.log(error);
        H.push("/error");
    }
}

export default verifyToken;