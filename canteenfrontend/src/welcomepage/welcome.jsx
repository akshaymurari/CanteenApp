import React from 'react'
import Header from '../headers/header';
import Homepage from '../assets/Homepage.jpg';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import './welcome.css';
const Welcome = () => {

    return (
        <>
            {/* <Homepage/> */}
            <img src={Homepage} className="m-0 p-0"
                style={{width:"100%",
                position:"absolute",
                top:0,
                left:0,
                zIndex:-999999,
                backgroundAttachment:"fixed",
                height:"100%",
                backgroundPosition:"center",
                backgroundRepeat:"norepeat"}}   alt=""></img>
            <div className="conatiner-fluid">
                <Header name="CanteenApp"  todo="register"/>
                <div className="row" className="m-0 p-0" style={{height:"100vh",backgroundPosition:"center center"}}>
                    <div className="col m-0 px-0" style={{ paddingTop: "40vh" }}>
                            <Link to="/AdminLogin"
                              style={{textDecoration:"none"}}>
                                <Button
                                    className="px-3 mx-auto mb-4 py-3"
                                    variant="outlined"
                                    style={{
                                        display:"block",
                                        border: "2px solid #674646",
                                        marginLeft: "auto",
                                        width:"12rem"

                                    }}                               
                                ><span style={{ color: "#474646" }}>Login as admin</span></Button>
                            </Link>
                            <Link to="/UserLogin"
                              style={{textDecoration:"none"}}>
                                <Button
                                    className="py-3 mx-auto"
                                    //   style={{marginTop:"5rem"}}
                                    variant="outlined"
                                    style={{
                                        display:"block",
                                        border: "2px solid #674646",
                                        marginLeft: "auto",
                                        width:"12rem"
                                    }}
                                ><span style={{ color: "#474646" }}>Customer Login</span></Button>
                            </Link>
                        </div>
                </div>
            </div>
        </>
    )
}

export default Welcome;
