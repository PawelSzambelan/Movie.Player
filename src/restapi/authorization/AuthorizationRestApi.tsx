import {PATH_BASE_URL} from "../../components/constants/apiPath";
import axios from "axios";
import {AnonymousAuthorizationSignInDto} from "./AnonymousAuthorizationSignInDto";
import {AuthorizationSignInDto} from "./AuthorizationSignInDto";

export type AuthorizationRestApiConfig = {
    readonly baseUrl: string;
}

// const defaultConfig: AuthorizationRestApiConfig = {
//     baseUrl: PATH_BASE_URL
// };

export const AuthorizationRestApi = () => {
    const currentConfig: AuthorizationRestApiConfig = {
        baseUrl: PATH_BASE_URL
    }
    return {
        async postAnonymousAuthorizationSignIn(body: {}): Promise<AnonymousAuthorizationSignInDto> {
            return await axios.post<AnonymousAuthorizationSignInDto>(`${currentConfig.baseUrl}/Authorization/SignIn`, body)
                .then((res) => res.data);
        },
        async postAuthorizationSignIn(body: {
            Username: string;
            Password: string;
        }): Promise<AuthorizationSignInDto> {
            return await axios.post<AuthorizationSignInDto>(`${currentConfig.baseUrl}/Authorization/SignIn`, body)
                .then((res) => res.data);
        },
    }
}