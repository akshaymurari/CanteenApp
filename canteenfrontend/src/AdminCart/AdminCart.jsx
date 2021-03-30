import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Baseurl } from '../App';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import './AdminCart.css';
import Card from './AdminCard';

const AdminCart = () => {
    const [myFoodItems, setmyFoodItems] = useState([]);
    const [data, setData] = useState([]);
    const [add, setadd] = useState(true);
    const H = useHistory();
    const [vis, setVis] = useState(false);
    useEffect(async () => {
        try {
            const token = (localStorage.getItem('token'));
            const result = await axios({
                method: 'POST',
                url: `${Baseurl}/verifyadminuser`,
                headers: {
                    "content-type": "application/json",
                    accept: "application/json"
                },
                data: JSON.stringify({ token })
            });
            // console.log(result.data);
        }
        catch (error) {
            // console.log(`error in AdminCarts ${error}`);
            H.push("/error");
        }
    }, []);
    useEffect(async () => {
        try {
            const token = (localStorage.getItem('token'));
            const result = await axios({
                method: "post",
                url: `${Baseurl}/fooditemsadmin`,
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                },
                data: JSON.stringify({ token })
            });
            // console.log(result.data);
            setData(result.data);
        }
        catch (error) {
            console.log(error);
            // H.push("/error");
        }
    }, [add]);
    const [values, setValues] = useState({
        fooditem: "",
        quantity: "",
        price: "",
        pic: ""
    });
    const handleFoodItemChange = (prop) => (event) => {
        if (prop === "pic") {
            setValues((pre) => ({
                ...pre, [prop]: event.target.files[0]
            }));
        }
        else {
            setValues((pre) => ({
                ...pre, [prop]: event.target.value
            }));
        }
    }
    const addFoodItem = async () => {
        const formData = new FormData();
        formData.append("file", values.pic);
        formData.append("data", JSON.stringify(values));
        try {
            const result = await axios({
                method: "post",
                url: `${Baseurl}/addFooditems`,
                data: formData,
                headers: {
                    "content-type": "multipart/form-data",
                }
            });
            console.log(result.data);
            setValues({
                fooditem: "",
                quantity: "",
                price: "",
                pic: ""
            });
            setadd((pre) => !pre);
        }
        catch (error) {
            console.log(`error is ${error}`);
        }
    }
    const closeShop = async () => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios({
                method: "delete",
                url: `${Baseurl}/fooditemsadmin`,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                data: JSON.stringify({ token })
            });
            // console.log(result.data);
            setData([]);
        }
        catch (error) {
            console.log(error);
        }
    }
    const adminLogout = async () => {
        // console.log("logging out");
        const token = localStorage.getItem("token");
        try {
            const result = await axios({
                method: "delete",
                url: `${Baseurl}/admin`,
                headers: {
                    "accept": "application/json",
                    "content-type": "application/json"
                },
                data: JSON.stringify({ token })
            })
            H.push("/");
        }
        catch (error) {
            console.log(error);
        }
    }
    const onupdatefood = () => {
        setadd((pre) => !pre);
    }
    const foodItemForm = () => {
        setVis(true);
    }
    return (
        <>
            <div
                id="foodItemForm"
                className="shadow-lg"
                style={{ visibility: (!vis) ? "hidden" : "visible", zIndex: 99999 }}
            >
                <TextField id="standard-basic"
                    className="mb-2"
                    onChange={handleFoodItemChange("fooditem")}
                    style={{ display: "block" }}
                    label="item name" />
                <TextField id="standard-basic"
                    onChange={handleFoodItemChange("quantity")}
                    className="mb-2"
                    style={{ display: "block" }}
                    label="quantity" />
                <TextField id="standard-basic"
                    onChange={handleFoodItemChange("price")}
                    className="mb-4"
                    style={{ display: "block" }}
                    label="set price" />
                <Button
                    variant="contained"
                    component="label"
                >
                    Upload Food image
                <input
                        onChange={handleFoodItemChange("pic")}
                        type="file"
                        hidden
                    />
                </Button> <br /> <br />
                <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    style={{ display: "block", width: "max-content" }}
                    className="mx-auto"
                    onClick={addFoodItem}
                >
                    add
                </Button>
            </div>
            <AppBar className="fixed-top" style={{ background: "#474646" }}>
                <Toolbar>
                    <IconButton edge="start"
                        onClick={foodItemForm}
                        color="inherit" aria-label="menu">
                        <Fab size="small" color="default" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </IconButton>
                    <Typography variant="h6"
                    >
                        Available Items
                    </Typography>
                    <Button
                        className="bg-danger"
                        variant="contained"
                        style={{ marginLeft: "auto" }}
                        onClick={closeShop}
                    >
                        Close
                    </Button>
                    <Button
                        className="bg-warning"
                        variant="contained"
                        style={{ marginLeft: "1rem" }}
                        onClick={adminLogout}
                    >logout
                    </Button>
                </Toolbar>
            </AppBar>
            <div className="container-fluid"
                style={{ height: "100vh", position: "absolute" }}
                onClick={() => setVis(false)}>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <Button variant="contained" color="secondary"
                        className="mx-auto"
                        style={{ marginTop: "6rem", maxWidth: "16rem" }}>
                        <Link
                        to="recievedOrders"
                        style={{textDecoration: "none",color:"white"}}>
                            RecievedOrders
                        </Link>
                    </Button>
                </div>
                <div
                    style={{ display: "flex", justifyContent: "space-around", flexWrap: "wrap" }}>
                    {data.map((ele) => <Card data={{ ...ele, func: onupdatefood }} />)}
                </div>
            </div>
        </>
    )
}

export default AdminCart;
