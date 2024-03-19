import {AxiosProgressEvent} from "axios";

export type TConverterFile = string
export type TUuid = string

export interface IConverterState {
    dragEnter: boolean
    dragActive: boolean,
    isConverting: boolean,
    isCancelUpload: boolean,
    files: IConvertedStateFile[],
    dragFilesCount?: number
}

export interface IConvertedStateFile {
    uuid: TUuid,
    name: string,
    size?: number,
    src: TConverterFile,
    file?: File
}
export interface IConvertingFormState {
    isLoading: boolean,
    isError: boolean,
    progress? : AxiosProgressEvent
}