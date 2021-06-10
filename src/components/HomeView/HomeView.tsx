import React from 'react';
import {MediaListView} from "../MediaListView/MediaListView";
import {Typography} from "@material-ui/core";
import {VerticalSpace} from "../VerticalSpace";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        textAlign: "center"
    }
})

export function HomeView() {
    const classes = useStyles();
    return (
        <div>
            <VerticalSpace height="3rem"/>
            <Typography className={classes.container} variant="h6">
                Let's check our videos!
            </Typography>
            <VerticalSpace height="3rem"/>
            <MediaListView mediaListId={2}/>
            <VerticalSpace height="3rem"/>
            <MediaListView mediaListId={3}/>
            <VerticalSpace height="3rem"/>
            <MediaListView mediaListId={4}/>
            <VerticalSpace height="5rem"/>
        </div>
    )
}