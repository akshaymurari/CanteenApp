import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import {Baseurl} from '../App';
import Card from './Card';

const RecievedOrders = () => {
    const [data,setdata] = useState([])
    const [search,onsearch] = useState(""); 
    const [update,onupdate] = useState(true);
    useEffect(async () => {
        const token = localStorage.getItem("userToken");
        let user = search;
        if(user===""){
            user="all"
        }
        try{
            const result = await axios({
                method:"post",
                url:`${Baseurl}/recievedFood/${user}`,
                headers:{
                    accept:"application/json",
                    "content-type": "application/json"
                },
                data: JSON.stringify({token})
            });
            console.log(result.data);
            setdata(result.data);
        }
        catch{
            console.log("error");
        }
    },[search,update]);

    const getdata = () => {
        onupdate((pre)=>!pre);
    }

    console.log(search)
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Material-UI
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={(e)=>onsearch(e.target.value)}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <div className="container-fluid mt-5" style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap"}}>
                {data.map((ele)=><Card data={{...ele,func:getdata}}/>)}
            </div>
        </div>
    )
}

export default RecievedOrders;
