import React from 'react';
import { useRouteMatch } from "react-router-dom";
import {PATH_FOR_PLAYER_VIEW} from "../constants/routerPaths";
import {Player} from "./Player";

type PlayerRouteParams = {
    readonly mediaId: string;
}

export const PlayerRoutes = () => {
    const match = useRouteMatch<PlayerRouteParams>(
        PATH_FOR_PLAYER_VIEW
    );
    const mediaId = match?.params.mediaId;
    if (!mediaId) {
        return null;
    }
    return <Player mediaId={parseInt(mediaId)} />
}