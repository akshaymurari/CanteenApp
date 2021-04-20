import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import { Baseurl } from '../App';
import {useHistory} from 'react-router-dom';

const Card = (props) => {
    const H = useHistory();
    const [value, setvalue] = useState("");
    const [paytm, setPaytm] = useState({
        amount: "",
        name: "",
        email: "",
        phone: ""
    });
    // console.log(props);
    // console.log(props.data.fooditem);
    // console.log(props.data.quantity);
    // console.log(props.data.price);
    // console.log(value);
    const addQuantity = async () => {
        console.log(paytm);
        const token = localStorage.getItem("userToken")
        console.log("adding quantity");
        try {
            const result = await axios({
                method: "patch",
                url: `${Baseurl}/buyitem`,
                headers: {
                    accept: "application/json",
                    "content-type": "application/json"
                },
                data: JSON.stringify({ token, ...props.data, quantity: value,...paytm })
            });
            console.log(result.data);
            // props.data.func();
            H.push("/payment",{amount:result.data.totalAmount,id:result.data._id});
            // H.push("/payment");

        }
        catch (error) {
            console.log(error);
        }
    }
    const handlechange = (props) => (e) => {
        console.log(paytm);
        setPaytm((pre) => ({ ...pre, [props]: e.target.value }))
    }
return (
    <>
        <div className="card shadow rounded" style={{ maxWidth: "16rem", marginTop: "6rem" }}>
            <img src={props.data.pic} class="card-img-top" alt="image not exists" />
            <div class="card-body">
                <h5 class="card-title">FoodItem : {props.data.fooditem}</h5>
                <h5 class="card-title">Quantity : {props.data.quantity}</h5>
                <h5 class="card-title">price : {props.data.price}</h5>
                {/* <TextField id="standard-basic" className="mt-0"
                    value={paytm.amount}
                    onChange={handlechange("amount")}
                    style={{ display: "inline-block", maxWidth: "75%" }} label="amount" />
                <TextField id="standard-basic" className="mt-0"
                    value={paytm.name}
                    onChange={handlechange("name")}
                    style={{ display: "inline-block", maxWidth: "75%" }} label="name" />
                <TextField id="standard-basic" className="mt-0"
                    value={paytm.email}
                    onChange={handlechange("email")}
                    style={{ display: "inline-block", maxWidth: "75%" }} label="email" />
                <TextField id="standard-basic" className="mt-0"
                    value={paytm.phone}
                    onChange={handlechange("phone")}
                    style={{ display: "inline-block", maxWidth: "75%" }} label="phone" /> */}
                <TextField id="standard-basic" className="mt-0"
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                    style={{ display: "inline-block", maxWidth: "75%" }} label="addquantity" />
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
