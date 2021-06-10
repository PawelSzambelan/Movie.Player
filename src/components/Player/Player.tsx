import React, {useEffect, useRef, useState} from 'react';
import {MediaRestApi, StreamTypeOptions} from "../../restapi/media/MediaRestApi";
import ReactHlsPlayer from 'react-hls-player';
import {CircularProgress} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {PATH_FOR_IMAGES} from "../constants/imgPath";

type PlayerProps = {
    readonly mediaId: number;
}

enum isVideoAvailable {
    WAITING,
    AVAILABLE,
    UNAVAILABLE
}

const useStyles = makeStyles({
    center: {
        position: "absolute",
        top: "50%",
        left: "50%"
    },
    container: {
        position: 'absolute',
        width: "100vw",
        height: "100vh"
    }
})

export const Player = (props: PlayerProps) => {
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [noVideoUrl, setNoVideoUrl] = useState<isVideoAvailable>(isVideoAvailable.WAITING);

    useEffect(() => {
        getContentUrl(props.mediaId).then();
    }, [props.mediaId]);

    const playerRef = useRef<HTMLVideoElement>(null!);

    async function getContentUrl(id: number): Promise<void> {
        const videoUrl = await MediaRestApi().postMediaPlayInfo({
            MediaId: id,
            StreamType: StreamTypeOptions.TRIAL
        });
        console.log(videoUrl.ContentUrl);
        if (videoUrl.ContentUrl) {
            setVideoUrl(videoUrl.ContentUrl);
            setNoVideoUrl(isVideoAvailable.AVAILABLE);
        } else {
            setNoVideoUrl(isVideoAvailable.UNAVAILABLE);
        }
    }

    const classes = useStyles();
    return (
        <div>
            {noVideoUrl === isVideoAvailable.WAITING ? (<CircularProgress className={classes.center} />) :
                noVideoUrl === isVideoAvailable.UNAVAILABLE ? (<img src={`${PATH_FOR_IMAGES}/404Illu.svg`} alt="404 illustration" className={classes.container} />) :
                        <ReactHlsPlayer
                            className={classes.container}
                            playerRef={playerRef}
                            src={videoUrl}
                            autoPlay={true}
                            controls={true}
                            width="100%"
                            height="auto"
                        />
            }
        </div>
    )
}