import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import LogInIlu from "../alignedImages/LogInIlu";
import {makeStyles} from "@material-ui/core/styles";
import {VerticalSpace} from "../VerticalSpace";
import {LoginView} from "../LoginView/LoginView";

const useStyles = makeStyles((theme) => ({
    container: {
        height: "100vh",
        position: "relative",
        border: "3px solid green"
    },
    card: {
        position: "absolute",
        top: "50%",
        left: "50%",
        margin: 0,
        maxWidth: "450px",
        minWidth: "400px",
        height: "500px",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
    },


    mainGrid: {
        width: '100vw',
        height: '95vh',
        backgroundColor: '#E8EBEE',
        alignItems: 'center',
    },
    bottomBar: {
        position: 'sticky',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        height: '5vh',
        alignContent: 'center',
        justifyContent: 'center',
    },
    insideGrid: {
        zIndex: 1,
    }
}));

export function SplashView() {
    const classes = useStyles();
    return (
    <>
        <Grid container className={classes.mainGrid}>
            <Grid item xs={12} md={7}></Grid>
            <Grid item xs={12} md={5} className={classes.insideGrid}>
                <Typography variant="h3" style={{fontWeight: 900}}>
                    Welcome!
                </Typography>
                <Typography variant="h6">Login to gain main access.</Typography>
                <VerticalSpace height="1.5rem"/>
                <LoginView />
            </Grid>
            <LogInIlu />
        </Grid>
        <div className={classes.bottomBar}>
            <Typography variant="body1" style={{color: 'white'}}>
                PS Video Player
            </Typography>
        </div>
    </>
    )
}