import {IConvertedStateFile, TUuid} from "@/interfaces/convertingFormInterfaces.ts";
import {AxiosProgressEvent} from "axios";
import {ComputedRef} from "vue";

//@ts-ignore

export interface IImagesStateItem {
    image: IConvertedStateFile,
    convertedImage?: IConvertedStateFile,
    uuid: TUuid
}

export interface IImageState {
    imagesList: IImagesStateItem[]
}

export interface IPostImageRequest {
    data: IPostImage
}
export interface IPostImageResponse {
    request: (formData: FormData) => Promise<IPostImageRequest>,
    progress?: ComputedRef<AxiosProgressEvent>
}

export interface IPostImage {
    name: string,
    format: string,
    src: string,
    height: number,
    width: string
    size: number,
    mimetype: string,
    uuid: TUuid
}