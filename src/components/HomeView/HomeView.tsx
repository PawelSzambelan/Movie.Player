import {useEffect, useState} from "react";
import {MediaRestApi, StreamTypeOptions} from "../../restapi/media/MediaRestApi";
import {MediaDto} from "../../restapi/media/MediaDto";
import {ImageDto} from "../../restapi/media/ImageDto";
import {makeStyles} from "@material-ui/core/styles";
import {PATH_FOR_IMAGES} from "../constants/imgPath";
import {Button, TextField} from "@material-ui/core";
import * as yup from "yup";
import {useFormik} from "formik";
import Pagination from '@material-ui/lab/Pagination';

type MediaToDisplay = {
    id: number;
    title: string;
    image: string;
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

const validationSchema = yup.object({
    mediaListNumber: yup
        .number()
        .min(1, "Min is 1.")
        .max(50, "Max is 50.")
        .required("This field is required.")
});

export function HomeView() {
    const [mediaListId, setMediaListId] = useState<number>(3);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [numberOfPages, setNumberOfPages] = useState<number>(1);
    const [mediaList, setMediaList] = useState<MediaToDisplay[]>([]);

    useEffect(() => {
        getMediaList(mediaListId).then();
    }, [mediaListId]);

    useEffect(() => {
        getMediaList(mediaListId, currentPage).then();
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

        console.log(list);
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

    const formik = useFormik({
        initialValues: {
            mediaListNumber: mediaListId - 1
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setMediaListId(values.mediaListNumber + 1);
        },
    });

    const classes = useStyles();
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    id="mediaListId"
                    value={formik.values.mediaListNumber}
                    type="number"
                    label="Choose list of media"
                    name="mediaListNumber"
                    variant="outlined"
                    onChange={formik.handleChange}
                    error={formik.touched.mediaListNumber && Boolean(formik.errors.mediaListNumber)}
                    helperText={formik.touched.mediaListNumber && formik.errors.mediaListNumber}
                />
                <Button type="submit" variant="contained" color="primary">
                    Load list
                </Button>
            </form>
            <br/>
            {mediaList.map(media => (<div>
                    <div key={media.id}>{media.title}</div>
                    <div className={classes.container}>
                        <div className={classes.imageWrapper}>
                            <img className={classes.image} src={media.image} alt=""/>
                        </div>
                    </div>
                    <br/>
                </div>
            ))}
            <div>
                <Pagination count={numberOfPages} color="primary" onChange={(event, page) => handlePageChange(page)}/>
            </div>
        </div>
    )
}