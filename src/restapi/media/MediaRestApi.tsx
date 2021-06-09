import {PATH_BASE_URL} from "../../components/constants/apiPath";
import axios from "axios";
import Cookies from "universal-cookie";
import {MediaListDto} from "./MediaListDto";

export type MediaRestApiConfig = {
    readonly baseUrl: string;
}

export const MediaRestApi = () => {
    const currentConfig: MediaRestApiConfig = {
        baseUrl: PATH_BASE_URL + '/Media'
    }
    return {
        async postMediaList(body: {
            "MediaListId": number;
            "IncludeCategories": boolean;
            "IncludeImages": boolean;
            "IncludeMedia": boolean;
            "PageNumber": number;
            "PageSize": number;
        }): Promise<MediaListDto> {
            const cookies = new Cookies();
            return await axios.post<MediaListDto>(`${currentConfig.baseUrl}/GetMediaList`, body,
                {
                    headers: {
                        Authorization: `${cookies.get('token')}`
                    }
                }).then((res) => res.data);
        }
    }
}