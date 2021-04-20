import React, { useState, useEffect } from 'react';
import './Payment.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Baseurl } from '../App';
import GooglePayButton from '@google-pay/button-react';

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const Payment = (props) => {
    console.log(props);
    const [value, setvalue] = useState();
    async function paynow() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}
		const data = await axios({
            url:`${Baseurl}/razorpay`,
            method: 'POST' ,
            data:({...value,amount:props.location.state.amount})
        });
		console.log(data.data)
		const options = {
			key:  'rzp_test_qJLV4RcpSNFD8a' ,
			currency: data.data.currency,
			amount: data.data.amount.toString(),
			order_id:data.data.id,
			name: 'CanteenApp',
			description: props.location.state.id,
			image: '',
			handler: function (response) {
				alert(response.razorpay_payment_id)
				alert(response.razorpay_order_id)
				alert(response.razorpay_signature)
			},
            notes: {
                "address": "Razorpay Corporate Office"
            },
			prefill: {
				name:value.name,
				email:value.email,
				phone_number: value.phone
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}
    // const paynow = async () => {
    //     let val;
    //     try {
    //         const data = await axios({
    //             method: "post",
    //             url: `${Baseurl}/paynow`,
    //             headers: {
    //                 "content-type": "application/json"
    //             },
    //             data: JSON.stringify({ amount: new String(props.location.state.amount), ...value })
    //         });
    //         val = data.data;
    //         console.log(data.data);
    //     }
    //     catch {
    //         console.log("error");
    //     }
    //     console.log(val);
    // }

    const handleChange = (prop) => (e) => {
        setvalue((pre) => ({ ...pre, [prop]: e.target.value }));
    }
    return (
        <>
            <div className="box mx-auto shadow p-5 rounded"
                style={{
                    maxWidth: "max-content",
                    // height: "50vh",
                    marginTop: "50vh"
                }}>
                <h3>PAYMENT DETAILS</h3>
                <TextField id="standard-basic" className="mx-auto mt-3"
                    onChange={handleChange("name")}
                    style={{ display: "block", maxWidth: "max-content" }} label="NAME" />
                <TextField id="standard-basic" className="mx-auto mt-3"
                    onChange={handleChange("phone")}
                    style={{ display: "block", maxWidth: "max-content" }} label="PHONE" />
                <TextField id="standard-basic" className="mx-auto my-3"
                    onChange={handleChange("email")}
                    style={{ display: "block", maxWidth: "max-content" }} label="EMAIL" />
                <div
                    style={{ marginTop: "2rem", display: "flex", justifyContent: "space-around" }}>
                    <Button color="primary" onClick={paynow}>paynow</Button>
                </div>
            </div>
        </>
    )
}

export default Payment
