import React,{useState} from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import {Baseurl} from '../App';

const Card = (props) => {
    const [value,setvalue] = useState("");
    // console.log(props);
    // console.log(props.data.fooditem);
    // console.log(props.data.quantity);
    // console.log(props.data.price);
    const addQuantity = async () => {
        // console.log(props);
        // console.log("updating quantity");
        const token = localStorage.getItem("token");
        const fooditem = props.data.fooditem;
        const quantity = parseInt(value); 
        try{
            const data = await axios({
                method:"patch",
                url:`${Baseurl}/fooditemsadmin`,
                headers: {
                    accept: "application/json",
                    "content-type": "application/json"
                },
                data:JSON.stringify({token,quantity,fooditem})
            });
            // console.log(data.data);
            if(data.data.nModified>0){
                props.data.func();
            }
            setvalue("");
        }
        catch(error){
            console.log(error);
        }
    }
    // console.log(value);
    return (
        <>
            <div className="card shadow rounded" style={{ maxWidth: "16rem", marginTop: "6rem" }}>
                <img src={props.data.pic} class="card-img-top" alt="image not exists" />
                <div class="card-body">
                    <h5 class="card-title">FoodItem : {props.data.fooditem}</h5>
                    <h5 class="card-title">Quantity : {props.data.quantity}</h5>
                    <h5 class="card-title">price : {props.data.price}</h5>
                    <TextField id="standard-basic" className="mt-0"
                    value={value}
                    onChange={(e)=>setvalue(e.target.value)} 
                    style={{display:"inline-block",maxWidth:"75%"}}label="addquantity" />
                    <IconButton aria-label="add" 
                       onClick={addQuantity}
                       >
                        <AddIcon />
                    </IconButton>
                    {/* <a href="#" class="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </>
    )
}

export default Card
