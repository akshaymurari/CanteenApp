import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom'
const Header = (params) => {
    return (
        <>
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
                        {params.name}
                    </Typography>
                    <Button color="inherit"
                        style={{ marginLeft: "auto" }}
                    ><Link to="/register"
                    className="text-white"
                    style={{textDecoration:"none"}}>{params.todo}</Link>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header
