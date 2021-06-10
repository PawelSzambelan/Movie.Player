import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {MediaRestApi} from "../../restapi/media/MediaRestApi";
import {MediaDto} from "../../restapi/media/MediaDto";
import {ImageDto} from "../../restapi/media/ImageDto";
import {PATH_FOR_IMAGES} from "../constants/imgPath";
import {CircularProgress, GridList, GridListTile, GridListTileBar, IconButton} from "@material-ui/core";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import Pagination from "@material-ui/lab/Pagination";
import {makeStyles} from "@material-ui/core/styles";
import {VerticalSpace} from "../VerticalSpace";

type MediaToDisplay = {
    id: number;
    title: string;
    image: string;
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        flexWrap: 'nowrap',
    },
    gridListTitle: {
        maxWidth: "500px",
        width: "auto !important",
        height: "100% !important"
    },
    imageWrapper: {
        position: "relative",
    },
    image: {
        objectFit: "cover",
        width: "100%",
        height: "100%",
        "&:hover": {
            opacity: "70%"
        }
    },
    playButton: {
        position: "absolute",
        top: "30%",
        left: "35%",
        zIndex: 20,
        "&:hover": {
            color: "#ffffff"
        }
    },
    iconSize: {
        fontSize: "4em"
    },
    center: {
        marginLeft: "50%"
    },
    loading: {
        position: "absolute",
        top: "50%",
        left: "50%"
    },
});


export function MediaListView(props: { mediaListId: number }) {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [mediaList, setMediaList] = useState<MediaToDisplay[]>([]);

    const history = useHistory();

    useEffect(() => {
        getMediaList(props.mediaListId).then();
    }, []);

    useEffect(() => {
        getMediaList(props.mediaListId, currentPage).then();
    }, [currentPage])

    async function getMediaList(mediaListId: number, page: number = 1): Promise<void> {
        const list = await MediaRestApi().postMediaList({
            MediaListId: mediaListId,
            IncludeCategories: false,
            IncludeImages: true,
            IncludeMedia: false,
            PageNumber: page,
            PageSize: 15,
        });

        setMediaList(mediaToDisplay(list.Entities));
        setNumberOfPages(getNumberOfPages(list.TotalCount));
    }

    function mediaToDisplay(mediaList: MediaDto[]): MediaToDisplay[] {
        return mediaList.map(media => {
            const frameImage: ImageDto | undefined = media.Images.find(image => image.ImageTypeCode === 'FRAME'
            );
            const frameImageUrl = frameImage ? frameImage.Url : `${PATH_FOR_IMAGES}/noImageFound.png`;
            return {
                id: media.Id,
                title: media.Title,
                image: frameImageUrl,
            };
        });
    }

    function getNumberOfPages(totalMediaCount: number): number {
        return Math.ceil(totalMediaCount / 15);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    function playVideo(id: number) {
        history.push(`/home/${id}`);
    }

    const classes = useStyles();
    return (
        <div>
            {
                mediaList.length === 0 ? (<CircularProgress className={classes.loading} />) :
                    <div>
                        <div className={classes.root}>
                            <GridList className={classes.gridList}>
                                {mediaList.map((media) => (
                                    <GridListTile key={media.id} className={classes.gridListTitle}>
                                        <div className={classes.imageWrapper}>
                                            <img className={classes.image} src={media.image} alt={media.title}/>
                                            <IconButton className={classes.playButton} color="default"
                                                        onClick={() => playVideo(media.id)}>
                                                <PlayCircleOutlineIcon className={classes.iconSize}/>
                                            </IconButton>
                                        </div>
                                        <GridListTileBar
                                            title={media.title}
                                        />
                                    </GridListTile>
                                ))}
                            </GridList>
                        </div>

                        <div className={classes.center}>
                            <VerticalSpace height="0.5rem"/>
                            <Pagination count={numberOfPages} color="primary"
                                        onChange={(event, page) => handlePageChange(page)}/>
                        </div>
                    </div>
            }
        </div>

    )


}