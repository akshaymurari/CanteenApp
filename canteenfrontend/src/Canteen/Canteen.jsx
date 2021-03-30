import React,{useState,useEffect} from 'react'
import verifyToken from '../verifyToken';
import {useHistory} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Baseurl} from '../App';
import Card from './item';

const Canteen = () => {

    const H = useHistory();

    const [data,setData] = useState([]);
    // console.log(localStorage.getItem("usertoken"))
    const getData = async () => {
        try{
            const result = await axios({
                method:"get",
                url:`${Baseurl}/FoodStore`,
                headers:{
                    "accept": "application/json",
                    "content-type": "application/json"
                }
            });
            console.log(result.data);
            setData(result.data);
        }
        catch{
            // H.push("/error");
        }
    }

    useEffect(async ()=>{
        await verifyToken(H);
        getData();
        console.log("helloo");
    },[]);
    
    return (
        <>
            <h1>in Canteen</h1>
            <AppBar className="fixed-top" style={{ background: "#474646" }}>
                <Toolbar>
                    {/* <IconButton edge="start"  */}
                    {/* // className={classes.menuButton}  */}
                    {/* color="inherit" aria-label="menu"> */}
                    {/* <MenuIcon /> */}
                    {/* </IconButton> */}
                    <Typography variant="h6"
                    //  className={classes.title}
                    >
                        Canteen
                    </Typography>
                    <Button color="secondary"
                        variant="contained"
                        style={{ marginLeft: "auto" }}
                    ><Link to="/"
                    className="text-white"
                    style={{textDecoration:"none"}}>logout</Link>
                    </Button>
                </Toolbar>
            </AppBar>
            <div className="container-fluid mt-5"
              style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
                {data.map((ele)=> <Card data={{...ele,func:getData}} />)}
            </div>
        </>
    )
}

export default Canteen;