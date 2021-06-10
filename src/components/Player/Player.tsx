import React, {useEffect, useRef, useState} from 'react';
import {MediaRestApi, StreamTypeOptions} from "../../restapi/media/MediaRestApi";
import ReactHlsPlayer from 'react-hls-player';

type PlayerProps = {
    readonly mediaId: number;
}

enum isVideoAvailable {
    WAITING,
    AVAILABLE,
    UNAVAILABLE
}

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

    return (
        <div>
            {noVideoUrl === isVideoAvailable.WAITING ? (<div>Loading....</div>) :
                noVideoUrl === isVideoAvailable.UNAVAILABLE ? (<div>Video not found!</div>) :
                    <div>
                        <ReactHlsPlayer
                            playerRef={playerRef}
                            src={videoUrl}
                            autoPlay={true}
                            controls={true}
                            width="100%"
                            height="auto"
                        />
                    </div>
            }
        </div>
    )
}