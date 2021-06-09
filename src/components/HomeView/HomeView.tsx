import {useEffect, useState} from "react";
import {MediaRestApi} from "../../restapi/media/MediaRestApi";
import {MediaDto} from "../../restapi/media/MediaDto";
import {ImageDto} from "../../restapi/media/ImageDto";
import {makeStyles} from "@material-ui/core/styles";

type MediaToDisplay = {
    id: number;
    title: string;
    image: string | undefined;
}

const useStyles = makeStyles({
    container: {
        maxWidth: "500px",
    },
    imageWrapper: {
        position: "relative",
        paddingBottom: "56.2%",
    },
    image: {
        position: "absolute",
        objectFit: "cover",
        width: "100%",
        height: "100%",
    },
});

export function HomeView() {
    const [mediaListId, setMediaListId] = useState<number>(2);
    const [mediaList, setMediaList] = useState<MediaToDisplay[]>([]);

    useEffect(() => {
        getMediaList().then();
    }, [mediaListId]);

    async function getMediaList(): Promise<void> {
        const list = await MediaRestApi().postMediaList({
            MediaListId: mediaListId,
            IncludeCategories: false,
            IncludeImages: true,
            IncludeMedia: false,
            PageNumber: 1,
            PageSize: 15,
        });

        console.log(list);
        setMediaList(mediaToDisplay(list.Entities));
    }

    function mediaToDisplay(mediaList: MediaDto[]): MediaToDisplay[] {
        const mediaToDisplay = mediaList.map(media => {
            const frameImage: ImageDto | undefined = media.Images.find(image =>
                image.ImageTypeCode === 'FRAME'
            );
            const frameImageUrl = frameImage ? frameImage.Url : undefined;
            return {
                id: media.Id,
                title: media.Title,
                image: frameImageUrl
            }
        })
        return mediaToDisplay;
    }

    const classes = useStyles();
    return (
        <div>
            {mediaList.map(media => (<div>
                    <div key={media.id}>{media.title}</div>
                    <div className={classes.container}>
                        <div className={classes.imageWrapper}>
                            <img className={classes.image} src={media.image} alt=""/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}