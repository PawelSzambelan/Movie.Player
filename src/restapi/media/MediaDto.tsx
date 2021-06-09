import {ImageDto} from "./ImageDto";

export type MediaDto = {
    readonly Id: number;
    readonly Title: string;
    readonly Images: ImageDto[];
}