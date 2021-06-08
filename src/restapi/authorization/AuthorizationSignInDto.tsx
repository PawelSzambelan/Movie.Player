export type AuthorizationSignInDto = {
    AuthorizationToken: {
        Token: string;
        TokenExpires: string;
        RefreshToken: string;
    },
    User: {
        Id: number;
        Email: string;
    }
}