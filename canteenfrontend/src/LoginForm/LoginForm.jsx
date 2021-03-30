import React, { useState, useEffect } from 'react';
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
import './LoginForm.css';
import axios from 'axios';
import {Baseurl} from '../App';
import {useHistory} from 'react-router-dom';

const LoginForm = (params) => {
    const H = useHistory();
    const [values, setValues] = React.useState({
        username: "",
        conformpass: "",
        password: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const login = async () => {
        if(params.title === "ADMIN LOGIN"){
            console.log("admin");
            try{
                const result = await axios({
                    method:"post",
                    url:`${Baseurl}/adminlogin`,
                    headers: {
                        "content-type":"application/json",
                        "accept":"application/json"
                    },
                    data:JSON.stringify(values)
                });
                localStorage.setItem("token",result.data.token);
                console.log(result.data);
                H.push("/AdminCart");
            }
            catch(error){
                console.log(`error in login form ${error}`);
                H.push("/error");
            }
        }
        else if(params.title === "USER LOGIN"){
            console.log("user");
            try{
                const result = await axios({
                    method:"post",
                    url:`${Baseurl}/userlogin`,
                    headers: {
                        "content-type":"application/json",
                        "accept":"application/json"
                    },
                    data:JSON.stringify(values)
                });
                console.log(result.data);
                localStorage.setItem("userToken",result.data.token);
                H.push('/Canteen');
            }
            catch(error){
                console.log(`error in login form ${error}`);
                H.push("/error");
            }
        }
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <div className="container ">
                <div className="row mx-auto py-5 mt-5 py-5 shadow rounded registerForm">
                    <h3 className="text-center text-uppercase" style={{ color: "#1976AA" }}>{params.title}</h3>
                    <TextField id="standard-basic"
                        className="mt-4 mx-auto"
                        onChange={handleChange("username")}
                        value={values.username}
                        style={{
                            display: 'block !important',
                            maxWidth: "75%"
                        }} label="username" />
            
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
                        onClick={login}
                        color="primary"
                        className="mx-auto mt-5 "
                        style={{
                            maxWidth: "50%",
                            //  maxWidth:"5rem",
                            //  background:"#a4db9a"

                        }}>
                        login
                    </Button>
                </div>
            </div>
        </>
    )
}

export default LoginForm
