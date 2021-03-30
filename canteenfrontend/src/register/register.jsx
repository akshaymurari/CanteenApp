import React, { useState, useEffect } from 'react';
import './register.css';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { Baseurl } from '../App';
const Register = () => {
    const H = useHistory();

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: '25ch',
        },
    }));
    const [values, setValues] = React.useState({
        username: "",
        conformpass: "",
        email: "",
        password: '',
        amount: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    // console.log(values);
    const addUser = async (event) => {
        event.preventDefault();
        console.log(`${Baseurl}/register`);
        let result;
        try {
             result = await axios({
                method: "post",
                url: `${Baseurl}/register`,
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json',
                },
                data: JSON.stringify(values),
            });
            localStorage.setItem("userToken",result.data.token);
            console.log(result.data);
            H.push("/Canteen");
        }
        catch {
            console.log(`error in addUser in register.jsx function ${result}`);
            H.push("/error");
        }
    }
    const classes = useStyles();
    return (
        <div >
            <div className="container ">
                <div className="row mx-auto py-5 mt-5 py-5 shadow rounded registerForm">
                    <h3 className="text-center text-uppercase" style={{ color: "#1976AA" }}>Register form</h3>
                    <TextField id="standard-basic"
                        className="mt-4 mx-auto"
                        onChange={handleChange("username")}
                        value={values.username}
                        style={{
                            display: 'block !important',
                            maxWidth: "75%"
                        }} label="username" />
                    <TextField id="standard-basic"
                        className="mt-4 mx-auto"
                        onChange={handleChange("email")}
                        value={values.email}
                        style={{
                            display: 'block !important',
                            maxWidth: "75%"
                        }} label="email" />
                    <FormControl
                        style={{
                            display: 'block !important',
                            maxWidth: "75%"
                        }}
                        className="mt-4 mx-auto"
                    // className={clsx(classes.margin, classes.textField)}
                    >
                        <InputLabel
                            htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <TextField id="standard-password-input"
                        type="password"
                        autoComplete="current-password"
                        onChange={handleChange("conformpass")}
                        value={values.conformpass}
                        className="mt-4 mx-auto"
                        style={{
                            display: 'block !important',
                            maxWidth: "75%"
                        }} label="conformpassword" />
                    <Button variant="outlined"
                        onClick={addUser}
                        color="primary"
                        className="mx-auto mt-5 "
                        style={{
                            maxWidth: "50%",
                            //  maxWidth:"5rem",
                            //  background:"#a4db9a"

                        }}>
                        register
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Register;