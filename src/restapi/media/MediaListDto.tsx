import {MediaDto} from "./MediaDto";

export type MediaListDto = {
    readonly Entities: MediaDto[];
    readonly TotalCount: number;
    readonly PageNumber: number;
}