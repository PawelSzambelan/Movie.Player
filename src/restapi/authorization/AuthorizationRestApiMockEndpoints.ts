import { server } from "../../mocks/msw/server";
import { rest } from "msw";
import {AnonymousUserDto} from "./AnonymousUserDto";

export function getAnonymousUser(
    anonymousUser: AnonymousUserDto
) {
    server.use(
        rest.get("*/Authorization/SignIn", (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json({
                    user: anonymousUser
                })
            )
        })
    )
}