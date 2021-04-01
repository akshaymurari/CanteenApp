import React, { useState, useEffect } from 'react';
import './Payment.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Baseurl } from '../App';

const Payment = (props) => {
    // console.log(props.location.state.amount);
    function isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    function isObj(val) {
        return typeof val === 'object'
    }

    function stringifyValue(val) {
        if (isObj(val) && !isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    function buildForm({ action, params }) {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', stringifyValue(params[key]))
            form.appendChild(input)
        })

        return form
    }

    function post(details) {
        const form = buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }


        const [value, setvalue] = useState({});
        const paynow = async () => {
            let val;
            try {
                const data = await axios({
                    method: "post",
                    url: `${Baseurl}/paynow`,
                    headers: {
                        "content-type": "application/json"
                    },
                    data: JSON.stringify({ amount: new String(props.location.state.amount), ...value })
                });
                val = data.data;
                console.log(data.data);
                // console.log(result.data);

            }
            catch {
                console.log("error");
            }
            try{
                var information={
                    action:"https://securegw-stage.paytm.in/order/process",
                    params:val
                }
                 post(information);
            }
            catch{
                console.log("error2")
            }
            console.log(val);
        }

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
                        <Button variant="contained" color="primary"
                            onClick={paynow}>
                            paynow
                        </Button>
                    </div>
                </div>
            </>
        )
    }

    export default Payment
