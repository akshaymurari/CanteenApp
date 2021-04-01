import React from 'react'
// import Button from "@material-ui/core/Button";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {Baseurl} from '../App';


const Card = (props) => {
    const deleteFoodItem = async () => {
        const token = localStorage.getItem("token");
        console.log(props);
        try{
            const result = await axios({
                method:"delete",
                url:`${Baseurl}/recievedFood`,
                headers:{
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                data:JSON.stringify({token,_id:props.data._id})
            });
            // console.log(result.data);
            props.data.func();
        }
        catch{
            console.log("error");
        }
    }
    return (
        <div>
              <div className="card shadow rounded" style={{ maxWidth: "16rem", marginTop: "2rem" ,backgroundColor:"#DDE6ED"}}>
                <div class="card-body">
                    <h5 class="card-title">username : {props.data.username}</h5>
                    <h5 class="card-title">status : {props.data.status}</h5>
                    <h5 class="card-title">item : {props.data.item}</h5>
                    <h5 class="card-title">price : {props.data.quantity}</h5>
                    <h5 class="card-title">totalAmount : {props.data.totalAmount}</h5>
                    <Button
                    variant="contained"
                    color="secondary"
                    className="mx-auto" 
                    onClick={deleteFoodItem}>delete</Button>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>
    )
}

export default Card;